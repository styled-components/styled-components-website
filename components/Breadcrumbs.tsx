'use client';

import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import { mobile } from '../utils/media';
import { color, font, text, space } from '../utils/tokens';
import Link from './Link';

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Override the auto-detected title for the current page */
  title?: string;
}

const SECTION_LABELS: Record<string, string> = {
  docs: 'Docs',
  blog: 'Blog',
  ecosystem: 'Ecosystem',
  showcase: 'Showcase',
  releases: 'Releases',
};

const DOCS_CATEGORY_LABELS: Record<string, string> = {
  basics: 'Basics',
  advanced: 'Advanced',
  api: 'API Reference',
  tooling: 'Tooling',
  faqs: 'FAQs',
};

export default function Breadcrumbs({ title }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = buildSegments(pathname, title);

  if (segments.length <= 1) return null;

  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          return (
            <Item key={segment.label + i}>
              {i > 0 && <Separator aria-hidden="true">/</Separator>}
              {isLast || !segment.href ? (
                <Current aria-current="page">{segment.label}</Current>
              ) : (
                <CrumbLink href={segment.href}>{segment.label}</CrumbLink>
              )}
            </Item>
          );
        })}
      </List>
    </Nav>
  );
}

function buildSegments(pathname: string, titleOverride?: string): BreadcrumbSegment[] {
  const parts = pathname.split('/').filter(Boolean);
  const segments: BreadcrumbSegment[] = [{ label: 'Home', href: '/' }];

  if (parts.length === 0) return segments;

  const section = parts[0];
  const sectionLabel = SECTION_LABELS[section] || section;

  // Top-level section
  segments.push({ label: sectionLabel, href: `/${section}` });

  // Docs sub-pages: /docs/basics, /docs/api, etc.
  if (section === 'docs' && parts[1]) {
    const categoryLabel = DOCS_CATEGORY_LABELS[parts[1]] || parts[1];
    segments.push({ label: categoryLabel });
  }

  // Blog posts: /blog/some-slug
  if (section === 'blog' && parts[1]) {
    segments.push({ label: titleOverride || parts[1] });
  }

  return segments;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const Nav = styled.nav`
  display: none;
  margin-bottom: ${space[4]};

  ${mobile(css`
    display: block;
  `)}
`;

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ${font.sans};
  font-size: ${text.sm};
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-left: 0;
`;

const Separator = styled.span`
  color: ${color.textMuted};
  user-select: none;
  margin: 0 0.35em;
`;

const CrumbLink = styled(Link).attrs({ inline: true })``;

const Current = styled.span`
  color: ${color.textMuted};
`;
