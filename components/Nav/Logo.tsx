import styled from 'styled-components';
import { color, font, fontWeight, text } from '../../utils/tokens';

const Logo = () => (
  <Wrapper>
    <Emoji aria-hidden="true">💅</Emoji>
    <Text>styled-components</Text>
  </Wrapper>
);

export default Logo;

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  white-space: nowrap;
`;

const Emoji = styled.span`
  font-size: 1.4em;
  line-height: 1;
`;

const Text = styled.span`
  font-family: ${font.sans};
  font-weight: ${fontWeight.semibold};
  font-size: ${text.base};
  color: ${color.text};
`;
