'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import json from '@/app/docs.json';
import titleToDash from '../../utils/titleToDash';
import { Home, SmartToy, MenuBook, RssFeed, Public, NewReleases, Favorite, TableChart } from '@styled-icons/material';
import { theme, font } from '../../utils/theme';
import useScrollSpy from '../../utils/useScrollSpy';
import Link from '../Link';
import SearchWithAlgolia from './SearchWithAlgolia';
import type { LatestPost } from '../../utils/blog';

const { pages: docsPages } = json;

// ---------------------------------------------------------------------------
// Top-level navigation items
// ---------------------------------------------------------------------------

type BadgeTone = 'green' | 'pink';

const TOP_LEVEL: ReadonlyArray<{
  href: string;
  label: string;
  icon: typeof Home;
  external?: boolean;
  badge?: string;
  badgeTone?: BadgeTone;
}> = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/llms.txt', label: 'Agents', icon: SmartToy },
  { href: '/docs', label: 'Documentation', icon: MenuBook },
  {
    href: '/docs/compatibility',
    label: 'Native CanIUse',
    icon: TableChart,
    badge: 'New',
    badgeTone: 'green',
  },
  { href: '/blog', label: 'Blog', icon: RssFeed },
  { href: '/ecosystem', label: 'Ecosystem', icon: Public },
  { href: '/releases', label: 'Releases', icon: NewReleases },
  {
    href: 'https://opencollective.com/styled-components',
    label: 'Donate',
    icon: Favorite,
    external: true,
    badge: 'Help Needed',
    badgeTone: 'pink',
  },
];

// When two top-level routes overlap (e.g. /docs and /docs/compatibility), only
// the longest matching prefix should mark active so a child entry doesn't
// double-highlight its parent.
function activeHref(pathname: string): string | null {
  let best: string | null = null;
  for (const { href, external } of TOP_LEVEL) {
    if (external) continue;
    if (pathname === href || pathname.startsWith(href + '/')) {
      if (best === null || href.length > best.length) best = href;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Smooth scroll for same-page section links
// ---------------------------------------------------------------------------

function handleSectionClick(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
  const target = document.getElementById(hash);
  if (!target) return;

  e.preventDefault();
  history.pushState(null, '', `#${hash}`);
  target.scrollIntoView({ block: 'start' });
}

// ---------------------------------------------------------------------------
// Unified sidebar menu
// ---------------------------------------------------------------------------

export default function SidebarMenu({ latestPost }: { latestPost: LatestPost }) {
  const pathname = usePathname();

  const inDocs = pathname.startsWith('/docs');
  const currentDocsPage = inDocs
    ? docsPages.find(p => pathname === `/docs/${p.pathname}` || pathname.startsWith(`/docs/${p.pathname}/`))
    : null;

  const sectionIds = React.useMemo(
    () => (currentDocsPage ? currentDocsPage.sections.map(s => titleToDash(s.title)) : []),
    [currentDocsPage]
  );
  const activeId = useScrollSpy(sectionIds);

  return (
    <MenuRoot aria-label="Site navigation">
      <SearchWrapper>
        <SearchWithAlgolia latestPost={latestPost} />
      </SearchWrapper>

      {TOP_LEVEL.map(({ href, label, icon: Icon, external, badge, badgeTone }) => {
        const isActive = !external && href === activeHref(pathname);

        return (
          <TopSection key={href}>
            <TopLink
              href={href}
              aria-current={isActive ? 'page' : undefined}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <NavIcon>
                <Icon size={16} />
              </NavIcon>
              {label}
              {badge && <TopBadge $tone={badgeTone}>{badge}</TopBadge>}
            </TopLink>

            {/* Docs: expand into categories + sections whenever the user is in the docs area,
                even when a more-specific top-level entry (e.g. Native CanIUse) is the visually active row. */}
            {href === '/docs' && inDocs && (
              <ChildList>
                {docsPages.map(({ title, pathname: pagePathname, sections }) => {
                  const categoryPath = `/docs/${pagePathname}`;
                  const isCategoryActive = pathname === categoryPath || pathname.startsWith(categoryPath + '/');

                  return (
                    <React.Fragment key={title}>
                      <CategoryLink href={categoryPath} aria-current={isCategoryActive ? 'page' : undefined}>
                        {title}
                      </CategoryLink>

                      {isCategoryActive && (
                        <SectionList>
                          {sections.map(({ title: sectionTitle }) => {
                            const sectionHash = titleToDash(sectionTitle);
                            const sectionHref = `${categoryPath}#${sectionHash}`;
                            const isSectionActive = activeId === sectionHash;

                            return (
                              <SectionLink
                                key={sectionTitle}
                                href={sectionHref}
                                aria-current={isSectionActive ? 'true' : undefined}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleSectionClick(e, sectionHash)}
                              >
                                {sectionTitle}
                              </SectionLink>
                            );
                          })}
                        </SectionList>
                      )}
                    </React.Fragment>
                  );
                })}
              </ChildList>
            )}
          </TopSection>
        );
      })}
    </MenuRoot>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const MenuRoot = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${theme.space[4]} 0 ${theme.space[10]};
`;

const SearchWrapper = styled.div`
  padding: ${theme.space[2]} ${theme.space[4]} ${theme.space[4]};

  .DocSearch-Button {
    width: 100% !important;
    margin: 0 !important;
    border-radius: ${theme.radius.md} !important;
    border: 1px solid color-mix(in oklch, ${theme.color.text} 10%, ${theme.color.surface}) !important;
    outline: none !important;
    box-shadow: none !important;

    &:focus,
    &:hover {
      box-shadow: none !important;
      outline: none !important;
      border-color: ${theme.color.accent} !important;
    }

    .DocSearch-Search-Icon {
      width: 15px !important;
      height: 15px !important;
      color: ${theme.color.textMuted} !important;
      transition: color ${theme.duration.normal} !important;
    }

    &:hover .DocSearch-Search-Icon,
    &:focus .DocSearch-Search-Icon {
      color: ${theme.color.textSecondary} !important;
    }

    .DocSearch-Button-Key {
      color: ${theme.color.textMuted} !important;
      background: none !important;
      border: 1px solid color-mix(in oklch, ${theme.color.text} 15%, ${theme.color.surface}) !important;
      border-radius: ${theme.radius.sm} !important;
      box-shadow: none !important;
      padding: 0 0.3em !important;
      font-size: 0.7em !important;
      min-width: 0 !important;
    }
  }
`;

const TopSection = styled.div`
  margin-bottom: ${theme.space[1]};
`;

const TopBadge = styled.span<{ $tone?: BadgeTone }>`
  display: inline-block;
  margin-left: ${theme.space[3]};
  padding: 2px ${theme.space[2]} 1px;
  font-size: ${theme.text.xs};
  font-weight: ${theme.fontWeight.medium};
  border-radius: ${theme.radius.full};
  line-height: 1.4;

  color: ${p =>
    p.$tone === 'pink' ? theme.palette[18] : `color-mix(in oklab, ${theme.palette[7]} 65%, ${theme.color.text})`};
  background: ${p =>
    p.$tone === 'pink'
      ? `color-mix(in oklab, ${theme.palette[18]} 18%, ${theme.color.bg})`
      : `color-mix(in oklab, color-mix(in oklab, ${theme.palette[7]} 65%, ${theme.color.text}) 22%, ${theme.color.bg})`};
`;

const NavIcon = styled.span`
  display: inline-flex;
  width: 20px;
  margin-right: ${theme.space[2]};
  opacity: 0.6;
  flex-shrink: 0;
`;

const TopLink = styled(Link).attrs({ variant: 'unstyled' as const })`
  display: flex;
  align-items: center;
  padding: ${theme.space[2]} ${theme.space[6]};
  font-family: ${font.sans};
  font-size: ${theme.text.base};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.color.textSecondary};
  text-decoration: none;
  transition:
    color ${theme.duration.fast},
    background-color ${theme.duration.fast};

  &[aria-current] {
    color: ${theme.color.accent} !important;

    ${NavIcon} {
      opacity: 1;
    }
  }

  &[aria-current]:hover,
  &[aria-current]:focus-visible {
    color: ${theme.color.accentDark} !important;
  }

  &:hover,
  &:focus-visible {
    color: ${theme.color.text};
    background: ${theme.color.accentSubtle};

    ${NavIcon} {
      opacity: 0.9;
    }
  }
`;

const ChildList = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.space[1]} 0 ${theme.space[2]};
`;

const CategoryLink = styled(Link).attrs({ variant: 'unstyled' as const })`
  display: block;
  padding: ${theme.space[1]} ${theme.space[6]} ${theme.space[1]} ${theme.space[8]};
  font-family: ${font.sans};
  font-size: ${theme.text.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.color.text};
  text-decoration: none;
  transition: color ${theme.duration.fast};

  &[aria-current] {
    color: ${theme.color.accent} !important;
    font-weight: ${theme.fontWeight.semibold};
  }

  &:hover,
  &:focus-visible {
    background: ${theme.color.accentSubtle};
    color: ${theme.color.text};
  }
`;

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 ${theme.space[2]};
`;

const SectionLink = styled(Link).attrs({ variant: 'unstyled' as const })`
  display: block;
  padding: ${theme.space[1]} ${theme.space[6]} ${theme.space[1]} ${theme.space[12]};
  font-family: ${font.sans};
  font-size: ${theme.text.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.color.text};
  text-decoration: none;
  transition:
    color ${theme.duration.fast},
    background-color ${theme.duration.fast};
  border-radius: 0 ${theme.radius.md} ${theme.radius.md} 0;

  &[aria-current='true'] {
    color: ${theme.color.accent} !important;
    font-weight: ${theme.fontWeight.semibold};
  }

  &:hover,
  &:focus-visible {
    background: ${theme.color.accentSubtle};
    color: ${theme.color.text};
  }
`;
