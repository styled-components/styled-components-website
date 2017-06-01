import React from 'react'
import { withTheme, ThemeProvider } from 'styled-components'

import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'

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
`).trim()

const Nesting = () => (
  <SectionLayout title="Nesting">
    <p>Nesting is a feature ported from Sass.</p>
    <p>While it is true that it <em>can</em> be abused, used sparingly it's a useful way 
      to take advantage of specificity and use it as a feature to reduce the number of 
      explicit classes you need to write.</p>

    <CodeBlock code={sample} language="jsx" />
  </SectionLayout>
)

export default Nesting