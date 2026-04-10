import styled from 'styled-components';
import { theme, font } from '../../utils/theme';
import PlatonicLogo from '../LogoConcepts/PlatonicLogo';

const Logo = () => (
  <Wrapper>
    <LogoIcon size={30} hideLabel />
    <Text>styled-components</Text>
  </Wrapper>
);

export default Logo;

const LogoIcon = styled(PlatonicLogo)`
  gap: 0;
  margin-right: 2px;
  transition:
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 300ms;

  html[data-hero-logo-visible] & {
    opacity: 0;
    transform: translateY(30px) scale(0.6);
  }
`;

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  white-space: nowrap;
`;

const Text = styled.span`
  font-family: ${font.display};
  font-weight: ${theme.fontWeight.semibold};
  font-size: calc(${theme.text.md} * 1.1 - 2px);
  letter-spacing: -0.015em;
  color: ${theme.color.text};
  transform: translateY(-1px);
`;
