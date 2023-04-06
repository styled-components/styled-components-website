import styled from 'styled-components';
import UnstyledLink from 'next/link';

import rem from '../utils/rem';
import { red, blmGrey, lightGrey } from '../utils/colors';

export const StyledLink = styled.a`
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

export const InlineLink = styled.a.attrs((/* props */) => ({
  target: '_blank',
  rel: 'noopener',
}))`
  color: ${p => (p['data-white'] ? 'white' : blmGrey)};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${p => (p['data-white'] ? 'white' : red)};
  }
`;

const Link = ({ ['aria-label']: ariaLabel, children, className, inline, unstyled, white, ...rest }) => {
  let Child = StyledLink;
  if (inline) {
    Child = InlineLink;
  } else if (unstyled) {
    Child = 'a';
  }

  let dataAttrs;
  if (white) {
    dataAttrs = { 'data-white': white };
  }

  return (
    <UnstyledLink {...rest}>
      <Child aria-label={ariaLabel} href={rest.href} className={className} {...dataAttrs}>
        {children}
      </Child>
    </UnstyledLink>
  );
};

export default Link;
