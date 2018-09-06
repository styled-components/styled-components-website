import styled, { css } from 'styled-components'
import rem from '../utils/rem'

import LinkIcon from 'react-octicons-svg/dist/LinkIcon'
import { Header, SubHeader, TertiaryHeader } from './Layout'
import { mobile } from '../utils/media'

const InvisibleAnchor = styled.div.attrs({
  'aria-hidden': true,
})`
  position: relative;
  display: block;
  visibility: hidden;
  height: 0;

  top: ${rem(-70)};

  ${mobile(css`
    top: ${rem(-90)};
  `)};
`

const Anchor = styled.a`
  display: none;
  position: absolute;
  left: 0;
  color: inherit;
`

const AnchorIcon = styled(LinkIcon).attrs({
  width: null,
  height: null,
})`
  width: ${rem(20)};
  opacity: 0.7;
  margin-top: ${rem(-5)};

  &:hover {
    opacity: 0.9;
  }
`

const AnchorHeader = styled(Header)`
  position: relative;
  margin-left: ${rem(-30)};
  padding-left: ${rem(30)};

  ${mobile(css`
    margin-left: 0;

    /* stylelint-disable-next-line */
    ${Anchor} {
      display: inline-block;
    }
  `)}

  &:hover ${Anchor} {
    display: inline-block;
  }
`

const Link = ({ children, level, id }) => {
  let override = undefined

  switch (level) {
    case 3:
      override = SubHeader
      break
    case 4:
      override = TertiaryHeader
      break
    default:
      break
  }

  return (
    <AnchorHeader as={override}>
      <InvisibleAnchor id={id} />

      <Anchor href={`#${id}`} aria-label={id}>
        <AnchorIcon />
      </Anchor>

      {children}
    </AnchorHeader>
  )
}

export default Link
