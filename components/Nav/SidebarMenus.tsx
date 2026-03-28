'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import json from '@/app/docs.json';
import titleToDash from '../../utils/titleToDash';
import { SmartToy, MenuBook, RssFeed, Public, NewReleases, Favorite } from '@styled-icons/material';
import { color, duration, font, space, text, fontWeight, radius } from '../../utils/tokens';
import { sidebarLinkStyle } from '../../utils/linkStyles';
import useScrollSpy from '../../utils/useScrollSpy';
import Link from '../Link';
import SearchWithAlgolia from './SearchWithAlgolia';

const { pages: docsPages } = json;

// ---------------------------------------------------------------------------
// Top-level navigation items
// ---------------------------------------------------------------------------

const TOP_LEVEL = [
  { href: '/llms.txt', label: 'Agents', icon: SmartToy },
  { href: '/docs', label: 'Documentation', icon: MenuBook },
  { href: '/blog', label: 'Blog', icon: RssFeed },
  { href: '/ecosystem', label: 'Ecosystem', icon: Public },
  { href: '/releases', label: 'Releases', icon: NewReleases },
  {
    href: 'https://opencollective.com/styled-components',
    label: 'Donate',
    icon: Favorite,
    external: true,
    badge: 'Help Needed',
  },
];

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

export default function SidebarMenu() {
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
        <SearchWithAlgolia />
      </SearchWrapper>

      {TOP_LEVEL.map(({ href, label, icon: Icon, external, badge }) => {
        const isActive = !external && (pathname === href || pathname.startsWith(href + '/'));

        return (
          <TopSection key={href}>
            <TopLink
              href={href}
              $active={isActive}
              aria-current={isActive ? 'page' : undefined}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <NavIcon>
                <Icon size={16} />
              </NavIcon>
              {label}
              {badge && <TopBadge>{badge}</TopBadge>}
            </TopLink>

            {/* Docs: expand into categories + sections */}
            {href === '/docs' && isActive && (
              <ChildList>
                {docsPages.map(({ title, pathname: pagePathname, sections }) => {
                  const categoryPath = `/docs/${pagePathname}`;
                  const isCategoryActive = pathname === categoryPath || pathname.startsWith(categoryPath + '/');

                  return (
                    <React.Fragment key={title}>
                      <CategoryLink
                        href={categoryPath}
                        $active={isCategoryActive}
                        aria-current={isCategoryActive ? 'page' : undefined}
                      >
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
  padding: ${space[4]} 0 ${space[10]};
`;

const SearchWrapper = styled.div`
  padding: ${space[2]} ${space[4]} ${space[4]};

  .DocSearch-Button {
    width: 100% !important;
    margin: 0 !important;
    border-radius: ${radius.md} !important;
    border: 1px solid color-mix(in oklch, ${color.text} 10%, ${color.surface}) !important;
    outline: none !important;
    box-shadow: none !important;

    &:focus,
    &:hover {
      box-shadow: none !important;
      outline: none !important;
      border-color: ${color.accent} !important;
    }

    .DocSearch-Search-Icon {
      width: 15px !important;
      height: 15px !important;
      color: ${color.textMuted} !important;
      transition: color ${duration.normal} !important;
    }

    &:hover .DocSearch-Search-Icon,
    &:focus .DocSearch-Search-Icon {
      color: ${color.textSecondary} !important;
    }

    .DocSearch-Button-Key {
      color: ${color.textMuted} !important;
      background: none !important;
      border: 1px solid color-mix(in oklch, ${color.text} 15%, ${color.surface}) !important;
      border-radius: ${radius.sm} !important;
      box-shadow: none !important;
      padding: 0 0.3em !important;
      font-size: 0.7em !important;
      min-width: 0 !important;
    }
  }
`;

const TopSection = styled.div`
  margin-bottom: ${space[1]};
`;

const TopBadge = styled.span`
  display: inline-block;
  margin-left: ${space[3]};
  padding: 2px ${space[2]} 1px;
  font-size: ${text.xs};
  font-weight: ${fontWeight.medium};
  color: ${color.blogAccent};
  background: ${color.blogAccentSubtle};
  border-radius: ${radius.full};
  line-height: 1.4;
`;

const NavIcon = styled.span`
  display: inline-flex;
  width: 20px;
  margin-right: ${space[2]};
  opacity: 0.6;
  flex-shrink: 0;
`;

const TopLink = styled(Link).attrs({ unstyled: true })<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${space[2]} ${space[6]};
  font-family: ${font.sans};
  font-size: ${text.base};
  font-weight: ${fontWeight.semibold};
  color: ${color.textSecondary};
  text-decoration: none;
  transition: color ${duration.fast}, background-color ${duration.fast};

  ${p =>
    p.$active &&
    css`
      color: ${color.accentLight};

      ${NavIcon} {
        opacity: 1;
      }
    `}

  &:hover,
  &:focus-visible {
    color: ${color.text};
    background: ${color.accentSubtle};

    ${NavIcon} {
      opacity: 0.9;
    }
  }
`;

const ChildList = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${space[1]} 0 ${space[2]};
`;

const CategoryLink = styled(Link).attrs({ unstyled: true })<{ $active?: boolean }>`
  display: block;
  padding: ${space[1]} ${space[6]} ${space[1]} ${space[8]};
  font-family: ${font.sans};
  font-size: ${text.sm};
  font-weight: ${fontWeight.semibold};
  color: ${color.text};
  text-decoration: none;
  transition: color ${duration.fast};

  ${p =>
    p.$active &&
    css`
      color: ${color.accentLight};
    `}

  &:hover,
  &:focus-visible {
    color: ${color.text};
  }
`;

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 ${space[2]};
`;

const SectionLink = styled(Link).attrs({ unstyled: true })`
  display: block;
  padding: ${space[1]} ${space[6]} ${space[1]} ${space[12]};
  font-family: ${font.sans};
  font-size: ${text.sm};
  font-weight: ${fontWeight.normal};
  color: ${color.text};
  text-decoration: none;
  transition: color ${duration.fast}, background-color ${duration.fast};
  border-radius: 0 ${radius.md} ${radius.md} 0;

  &[aria-current='true'] {
    color: ${color.accentLight};
    font-weight: ${fontWeight.medium};
  }

  &:hover,
  &:focus-visible {
    color: ${color.text};
    background: ${color.accentSubtle};
  }
`;
