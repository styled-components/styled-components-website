import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

const Styled = () => md`
  ### \`styled\` | web | native

  This is the default export.
  This is a low-level factory we use to create the \`styled.tagname\` helper methods.

  ${
    <Table head={[ 'Arguments', 'Description' ]}>
      <Row>
        <Column>
          1. <Code>component</Code> / <Code>tagname</Code>
        </Column>
        <Column>
          Either a valid react component or a tagname like <Code>'div'</Code>.
        </Column>
      </Row>
    </Table>
  }

  Returns a function that accepts a tagged template literal and turns it into a \`Styled Component\`.

  \`\`\`jsx
  import styled from 'styled-components';

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

  > We encourage you to not use the \`styled('tagname')\` notation directly.
  > Instead, rely on the \`styled.tagname\` methods like \`styled.button\`.
  > We define all valid HTML5 and SVG elements. (It's an automatic fat finger check too)

  You can see this method being introduced in the [Getting started](/docs/basics#getting-started) section.

  #### .attrs

  This is a chainable method that attaches some props to a styled component.
  The first and only argument is an object that will be merged into the rest of the
  component's props. The \`attrs\` object accepts the following values:

  ${
    <Table head={[ 'Values', 'Description' ]}>
      <Row>
        <Column>
          <Code>Prop Value</Code>
        </Column>
        <Column>
          These can be of any type, except functions. They'll stay static and will be
          merged into the existing component props.
        </Column>
      </Row>

      <Row>
        <Column>
          <Code>Prop Factory</Code>
        </Column>
        <Column>
          A function that receives the props that are passed into the component and computes
          a value, that is then going to be merged into the existing component props.
        </Column>
      </Row>
    </Table>
  }

  Returns another \`Styled Component\`.

  \`\`\`jsx
  import styled from 'styled-components';

  const Input = styled.input.attrs({
    type: 'text',
    size: props => props.small ? 3 : 8
  })\`
    background: palevioletred;
    border-radius: 3px;
    border: none;
    color: white;
    padding: \${props => props.padding}
  \`;
  \`\`\`

  Learn more about this constructor in the (Attaching Additional Props)[/docs/basics#attaching-additional-props] section.
`

export default Styled
