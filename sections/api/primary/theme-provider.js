import React from 'react'

import md from 'components/md'
import Table, { Row, Column } from 'components/Table'
import Code from 'components/Code'

const ThemeProvider = () => md`
  ### \`ThemeProvider\` | web | native

  A helper component for theming. Injects the theme into all styled components anywhere
  beneath it in the component tree, via the context API.
  Check the section on [Theming](/docs/advanced#theming).

  ${
    <Table head={[ 'Props', 'Description' ]}>
      <Row>
        <Column>
          <Code>theme</Code>
        </Column>
        <Column>
          An object that will be injected as <Code>theme</Code> into all interpolations in styled components
          beneath the provider.
        </Column>
      </Row>
    </Table>
  }

  \`\`\`jsx
  import styled, { ThemeProvider } from 'styled-components';

  const Box = styled.div\`
    color: \${props => props.theme.color};
  \`;

  <ThemeProvider theme={{ color: 'mediumseagreen' }}>
    <Box>I'm mediumseagreen!</Box>
  </ThemeProvider>
  \`\`\`
`

export default ThemeProvider
