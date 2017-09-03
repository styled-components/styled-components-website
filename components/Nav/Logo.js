import styled from 'styled-components'

import rem from '../../utils/rem'

const Logo = styled.div`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  width: ${rem(164)};
  height: ${rem(40)};

  background-image: url(/static/nav-logo.png);
  background-position: center;
  background-size: contain;
`

export default Logo
