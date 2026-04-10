'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../utils/theme';
import rem from '../utils/rem';

// ---------------------------------------------------------------------------
// Link design system — all variants defined in one place
// ---------------------------------------------------------------------------

export type LinkVariant = 'inline' | 'heading' | 'block' | 'unstyled';

// Inline: colored text with dotted underline that turns solid on hover
export const inlineStyle = css`
  color: ${theme.color.accent};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  text-decoration: underline dotted;
  text-decoration-color: ${theme.color.accent};
  text-underline-offset: 3px;
  transition:
    color ${theme.duration.fast},
    text-decoration-color ${theme.duration.fast},
    text-decoration-style ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    color: ${theme.color.accentDark};
    text-decoration-style: solid;
    text-decoration-color: ${theme.color.accentDark};
  }
`;

// Heading: inherits text color (white on dark, dark on light), underline on hover
export const headingStyle = css`
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: text-decoration-color ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    text-decoration-color: ${theme.color.linkUnderlineHover};
    text-underline-offset: 3px;
  }
`;

// Block: larger clickable area with subtle background hover, for standalone links
export const blockStyle = css`
  display: inline-block;
  color: inherit;
  cursor: pointer;
  padding: ${rem(2)} ${rem(8)};
  margin: ${rem(-2)} ${rem(-8)};

  @media (min-width: ${1000 / 16}em) {
    border-radius: ${theme.radius.md};

    &:hover {
      background: ${theme.color.accentSubtle};
    }
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface LinkProps extends Omit<NextLinkProps, 'as'>, Omit<AnchorProps, keyof NextLinkProps | 'ref'> {
  variant?: LinkVariant;
  ref?: React.Ref<HTMLAnchorElement>;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export default function Link({ children, href, variant = 'block', target, ...rest }: LinkProps) {
  const resolved = variant;

  const hrefString = typeof href === 'string' ? href : href?.toString() || '';
  const isExternal = hrefString.startsWith('http') || hrefString.startsWith('//') || /\.\w+$/.test(hrefString);
  const finalTarget = target || (isExternal ? '_blank' : undefined);
  const rel = isExternal ? 'noopener' : undefined;

  if (resolved === 'unstyled') {
    if (isExternal) {
      return (
        <a href={hrefString} target={finalTarget} rel={rel} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <NextLink href={href} target={finalTarget} {...rest}>
        {children}
      </NextLink>
    );
  }

  if (resolved === 'inline' || resolved === 'heading') {
    const Anchor = resolved === 'heading' ? HeadingLink : InlineLink;
    const NLink = resolved === 'heading' ? HeadingNextLink : InlineNextLink;

    if (isExternal) {
      return (
        <Anchor href={hrefString} target={finalTarget} rel={rel} {...rest}>
          {children}
        </Anchor>
      );
    }
    return (
      <NLink href={href} target={finalTarget} {...rest}>
        {children}
      </NLink>
    );
  }

  if (isExternal) {
    return (
      <StyledLink href={hrefString} target={finalTarget} rel={rel} {...rest}>
        {children}
      </StyledLink>
    );
  }
  return (
    <BlockNextLink href={href} target={finalTarget} {...rest}>
      {children}
    </BlockNextLink>
  );
}

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

export const InlineLink = styled.a`
  ${inlineStyle}
`;
const InlineNextLink = styled(NextLink)`
  ${inlineStyle}
`;

export const HeadingLink = styled.a`
  ${headingStyle}
`;
const HeadingNextLink = styled(NextLink)`
  ${headingStyle}
`;

export const StyledLink = styled.a`
  ${blockStyle}
`;
const BlockNextLink = styled(NextLink)`
  ${blockStyle}
`;
