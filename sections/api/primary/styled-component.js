import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

const StyledComponent = () => md`
  ### \`StyledComponent\` | web | native

  A styled React component. This is returned when you
  call \`styled.tagname\` or \`styled(Component)\` with styles.

  This component can take any prop. It passes it on to the HTML node if it's a valid attribute,
  otherwise it only passes it into interpolated functions. (see [Tagged Template Literal](/advanced/#tagged-template-literals))

  You can pass an arbitrary classname to a styled component without problem and it will be applied
  next to the styles defined by the styled call.
  (e.g. \`<MyStyledComp className="bootstrap__btn" />\`)

  #### .extend

  This is a method that creates a new \`StyledComponent\` and extends its rules.

  ${
    <Table head={[ 'Arguments', 'Description' ]}>
      <Row>
        <Column>
          1. <Code>TaggedTemplateLiteral</Code>
        </Column>
        <Column>
          A tagged template literal with your CSS and interpolations.
        </Column>
      </Row>
    </Table>
  }

  Returns a new \`StyledComponent\` with the new rules merged into the ones of the component
  this method was called on.

  You can see it in action in the [Extending Styles](/docs/basics#extending-styles) section.

  #### .withComponent

  This is a method that creates a new \`StyledComponent\` with a different tag or component
  applied to it, but all the same rules of the one it's called on.

  ${
    <Table head={[ 'Arguments', 'Description' ]}>
      <Row>
        <Column>
          1. <Code>component</Code> / <Code>tagname</Code>
        </Column>
        <Column>
          Either a valid react component or a tagname like \`'div'\`.
        </Column>
      </Row>
    </Table>
  }

  Returns a new \`StyledComponent\` with the new tag / component being applied when it's used.

  You can see it in action in the [Extending Styles](/docs/basics#extending-styles) section.
`

export default StyledComponent
