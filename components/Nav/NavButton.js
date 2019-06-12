import styled from 'styled-components';

import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';
import { resetInput } from '../../utils/form';

const NavButton = styled.button`
  ${resetInput};
  background: ${p => (p.active ? 'rgba(0, 0, 0, 0.07)' : 'none')};
  cursor: pointer;
  flex: 0 0 auto;
  height: ${rem(navbarHeight)};
  padding: 0 ${rem(10)};
  text-align: center;
  vertical-align: middle;

  & + ${NavButton} {
    padding-left: 0;
  }
`;

export default NavButton;
