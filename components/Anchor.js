import styled, { css } from 'styled-components';
import rem from '../utils/rem';

import { Link as LinkIcon } from '@styled-icons/material';
import { Header, SubHeader, TertiaryHeader } from './Layout';
import { mobile } from '../utils/media';

const InvisibleAnchor = styled.div.attrs((/* props */) => ({
  'aria-hidden': true,
}))`
  position: relative;
  display: block;
  visibility: hidden;
  height: 0;

  top: ${rem(-70)};

  ${mobile(css`
    top: ${rem(-90)};
  `)};
`;

const Anchor = styled.a`
  display: none;
  color: inherit;
  margin-left: ${rem(10)};
`;

const AnchorIcon = styled(LinkIcon).attrs((/* props */) => ({
  width: null,
  height: null,
}))`
  width: ${rem(20)};
  opacity: 0.7;
  margin-top: ${rem(-5)};

  &:hover {
    opacity: 0.9;
  }
`;

const AnchorHeader = styled.div`
  position: relative;

  ${mobile(css`
    /* stylelint-disable-next-line */
    ${Anchor} {
      display: inline-block;
    }
  `)}

  &:hover ${Anchor} {
    display: inline-block;
  }
`;

const Link = ({ children, level, id, ...props }) => {
  let override = undefined;

  switch (level) {
    case 3:
      override = SubHeader;
      break;
    case 4:
      override = TertiaryHeader;
      break;
    default:
      override = Header;
      break;
  }

  return (
    <AnchorHeader {...props} as={override}>
      <InvisibleAnchor id={id} />

      {children}

      <Anchor href={`#${id}`} aria-label={id}>
        <AnchorIcon />
      </Anchor>
    </AnchorHeader>
  );
};

export default Link;
