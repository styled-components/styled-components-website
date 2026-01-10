'use client';

import UnstyledLink, { LinkProps as UnstyledLinkProps } from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { blmGrey, lightGrey, red } from '../utils/colors';
import rem from '../utils/rem';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface LinkProps extends UnstyledLinkProps, Omit<AnchorProps, keyof UnstyledLinkProps | 'ref'> {
  inline?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
  unstyled?: boolean;
  white?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export default function Link({
  ['aria-label']: ariaLabel,
  children,
  className,
  inline,
  title,
  unstyled,
  white,
  target,
  href,
  ...rest
}: LinkProps) {
  const hrefString = typeof href === 'string' ? href : href?.toString() || '';
  const isExternal = hrefString.startsWith('http') || hrefString.startsWith('//');

  if (unstyled || isExternal) {
    const Child = unstyled ? 'a' : inline ? InlineLink : StyledLink;
    const dataAttrs = white ? { 'data-white': white } : {};
    const finalTarget = target || (isExternal ? '_blank' : undefined);

    return (
      <Child
        href={hrefString}
        aria-label={ariaLabel}
        className={className}
        title={title}
        target={finalTarget as any}
        rel={isExternal ? 'noopener' : undefined}
        {...dataAttrs}
      >
        {children}
      </Child>
    );
  }

  const Child = inline ? InlineLink : StyledLink;
  const dataAttrs = white ? { 'data-white': white } : {};

  return (
    <Child
      as={UnstyledLink as any}
      href={href as any}
      aria-label={ariaLabel}
      className={className}
      title={title}
      {...dataAttrs}
      {...rest}
    >
      {children}
    </Child>
  );
}

export const StyledLink = styled.a<{ href?: string; children?: React.ReactNode }>`
  display: inline-block;
  color: inherit;
  cursor: pointer;
  padding: ${rem(2)} ${rem(8)};
  margin: ${rem(-2)} ${rem(-8)};

  @media (min-width: ${1000 / 16}em) {
    border-radius: ${rem(3)};

    &:hover {
      background: ${lightGrey};
    }
  }
`;

export const InlineLink = styled.a.attrs<{ target?: string; rel?: string }>((/* props */) => ({
  target: '_blank',
  rel: 'noopener',
}))<{ target?: string; rel?: string }>`
  color: ${blmGrey};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${red};
  }

  &[data-white] {
    color: white !important;
  }
`;
