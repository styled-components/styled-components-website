import styled from 'styled-components';
import rem from '../../utils/rem';

const Logo = styled.div`
  background-image: url(/nav-logo.png);
  background-position: center;
  background-size: contain;
  box-sizing: border-box;
  display: inline-block;
  height: ${rem(40)};
  width: ${rem(164)};
  vertical-align: middle;
`;

export default Logo;
