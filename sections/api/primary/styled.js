import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

const Styled = () => md`
  ### \`styled\`

  This is the default export.
  This is a low-level factory we use to create the \`styled.tagname\` helper methods.

  ${(
    <Table head={['Arguments', 'Description']}>
      <Row>
        <Column>
          1. <Code>component</Code> / <Code>tagname</Code>
        </Column>
        <Column>
          Either a valid react component or a tagname like <Code>'div'</Code>.
        </Column>
      </Row>
    </Table>
  )}

  Returns a function that accepts a tagged template literal and turns it into a \`StyledComponent\`.

  \`\`\`jsx
  import styled from "styled-components";

  const Button = styled.button\`
    background: palevioletred;
    border-radius: 3px;
    border: none;
    color: white;
  \`;

  const TomatoButton = styled(Button)\`
    background: tomato;
  \`;
  \`\`\`

  You can see this method being introduced in the [Getting started](/docs/basics#getting-started) section.
`

export default Styled
