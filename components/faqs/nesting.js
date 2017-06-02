import React from 'react'
import { withTheme, ThemeProvider } from 'styled-components'

import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'
import LiveEdit from '../LiveEdit'

const scope = { withTheme, ThemeProvider }
const sample = (`
const ColorChanger = styled.section\`
  background: papayawhip;

  > h2 {
    color: palevioletred;
  }

  @media(min-width: 768px) {
    background: mediumseagreen;

    > h2 {
      color: papayawhip;
    }
  }
\`;
render(
  <ColorChanger href="#">
    <h2>Hello world!</h2>
  </ColorChanger>
)
`).trim()

const Nesting = () => (
  <SectionLayout title="Nesting">
    <p>Nesting is a feature ported from Sass. Used sparingly it's a great way to lighten your code by reducing the need to create explicit classes for every element.</p>
    <p>It's also incredibly convenient to co-locate media queries, since we can see at a glance exactly how the component will respond at any resolution.</p>
    <LiveEdit
      code={sample}
      scope={scope}
      noInline
    />
  </SectionLayout>
)

export default Nesting