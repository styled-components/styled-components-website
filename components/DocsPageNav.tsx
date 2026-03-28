'use client';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@styled-icons/material';
import styled, { css } from 'styled-components';
import { color, font, fontWeight, text, space, duration, radius } from '../utils/tokens';
import { mobile } from '../utils/media';
import Link from './Link';
import json from '@/app/docs.json';

const { pages } = json;

interface DocsPageNavProps {
  /** The current docs category pathname (e.g. "basics", "advanced") */
  current: string;
}

export default function DocsPageNav({ current }: DocsPageNavProps) {
  const currentIndex = pages.findIndex(p => p.pathname === current);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <Nav aria-label="Documentation pagination">
      {prev ? (
        <NavLink href={`/docs/${prev.pathname}`} $direction="prev">
          <NavIcon as={KeyboardArrowLeft} aria-hidden="true" />
          <NavContent $align="left">
            <NavLabel>Previous</NavLabel>
            <NavTitle>{prev.title}</NavTitle>
          </NavContent>
        </NavLink>
      ) : (
        <Spacer />
      )}

      {next ? (
        <NavLink href={`/docs/${next.pathname}`} $direction="next">
          <NavContent $align="right">
            <NavLabel>Next</NavLabel>
            <NavTitle>{next.title}</NavTitle>
          </NavContent>
          <NavIcon as={KeyboardArrowRight} aria-hidden="true" />
        </NavLink>
      ) : (
        <Spacer />
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  gap: ${space[4]};
  margin-top: ${space[12]};
  padding-top: ${space[8]};
  border-top: 1px solid ${color.border};

  ${mobile(css`
    flex-direction: column;
  `)}
`;

const NavLink = styled(Link).attrs({ unstyled: true })<{ $direction: 'prev' | 'next' }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${space[3]};
  padding: ${space[4]} ${space[5]};
  border: 1px solid ${color.border};
  border-radius: ${radius.lg};
  text-decoration: none;
  color: inherit;
  transition: border-color ${duration.normal}, background-color ${duration.normal};

  ${p =>
    p.$direction === 'next' &&
    css`
      justify-content: flex-end;
    `}

  &:hover,
  &:focus-visible {
    border-color: ${color.accent};
    background: ${color.accentSubtle};
  }
`;

const NavContent = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  text-align: ${p => p.$align};
`;

const NavLabel = styled.span`
  font-family: ${font.sans};
  font-size: ${text.xs};
  font-weight: ${fontWeight.medium};
  color: ${color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NavTitle = styled.span`
  font-family: ${font.display};
  font-size: ${text.lg};
  font-weight: ${fontWeight.semibold};
  color: ${color.text};
`;

const NavIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  color: ${color.textMuted};
  flex-shrink: 0;
`;

const Spacer = styled.div`
  flex: 1;
`;
