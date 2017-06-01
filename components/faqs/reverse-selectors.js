import React from 'react'
import { withTheme, ThemeProvider } from 'styled-components'

import SectionLayout from '../SectionLayout'
import LiveEdit from '../LiveEdit'

const scope = { withTheme, ThemeProvider }
const sample = (`
const Link = styled.a\`
  display:     inline-flex;
  background:  papayawhip;
  color:       palevioletred;
\`;

const Indicator = styled.span\`
  transition: background 0.5s;

  display:    inline-block;
  width:      20px;
  background: mediumseagreen;

  \${Link}:hover & {
    background: currentColor;
  }
\`;

const Label = styled.span\`
  padding: 10px;
\`

render(
  <Link>
    <Indicator/>
    <Label>Hovering me changes things</Label>
  </Link>
)
`).trim()

const ReverseSelectors = () => (
  <SectionLayout title="Reverse Selectors">
    <p>Reverse Selectors content.</p>
    <LiveEdit
      code={sample}
      scope={scope}
      noInline
    />
  </SectionLayout>
)

export default ReverseSelectors