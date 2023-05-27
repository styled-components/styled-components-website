import styled from 'styled-components';
import { resetInput } from '../../utils/form';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';

const NavButton = styled.button<{ $active?: boolean }>`
  ${resetInput};
  background: ${p => (p.$active ? 'rgba(0, 0, 0, 0.07)' : 'none')};
  cursor: pointer;
  flex: 0 0 auto;
  height: ${rem(navbarHeight)};
  padding: 0 ${rem(10)};
  text-align: center;
  vertical-align: middle;

  & + & {
    padding-left: 0;
  }
`;

export default NavButton;
