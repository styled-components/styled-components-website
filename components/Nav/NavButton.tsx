import styled from 'styled-components';
import { resetInput } from '../../utils/form';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string };

type NavButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & AccessibleName;

const NavButton = styled.button.attrs(() => ({
  type: 'button',
}))<NavButtonProps>`
  ${resetInput};
  background: transparent;
  cursor: pointer;
  flex: 0 0 auto;
  height: ${rem(navbarHeight)};
  padding: 0 ${rem(10)};
  text-align: center;
  transition: all 200ms ease-in-out;
  vertical-align: middle;

  min-width: ${rem(44)};
  min-height: ${rem(44)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.85);
  }

  &:active {
    filter: brightness(1);
  }

  & + & {
    padding-left: 0;
  }
`;

export default NavButton;
