import styled from 'styled-components'
import { monospace } from '../utils/fonts'
import { paleGrey } from '../utils/colors'

import '../utils/prismTemplateString'

const Code = styled.span`
  background: ${paleGrey};
  border-radius: 3px;
  font-family: ${monospace};
  font-size: 85%;
  font-weight: 300;
  padding: 0.15em 0;

  &::before,
  &::after {
    letter-spacing: -0.2em;
    content: "\00a0";
  }
`

export default Code
