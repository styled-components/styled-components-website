import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

const IsStyledComponent = () => md`
  ### \`isStyledComponent\`

  A utility to help identify styled components.

  ${(
    <Table head={['Arguments', 'Description']}>
      <Row>
        <Column>
          1. <Code>Function</Code>
        </Column>
        <Column>
          {md`Any function expected to possibly be a styled component or React component wrapped in a styled component, via the \`styled()\` factory.`}
        </Column>
      </Row>
    </Table>
  )}

  Returns true if the passed function is a valid styled components-wrapped component class. This is useful for determining if \`innerRef\` or \`ref\` should be passed:

  \`\`\`jsx
  import React from "react";
  import { isStyledComponent } from "styled-components";
  import MaybeStyledComponent from "./somewhere-else";

  const shouldUseInnerRef = isStyledComponent(MaybeStyledComponent);

  class MyComponent extends React.Component {
    componentDidMount() {
      // something interesting with this.el
    }

    render() {
      return React.createElement(
        MaybeStyledComponent, {
          [shouldUseInnerRef ? "innerRef" : "ref"]: node => { this.el = node; }
        }
      )
    }
  }
  \`\`\`

  It also can be useful for determining if a component needs to be wrapped such that it can be used as a component selector:

  \`\`\`jsx
  import React from "react";
  import styled, { isStyledComponent } from "styled-components";
  import MaybeStyledComponent from "./somewhere-else";

  let TargetedComponent =
    isStyledComponent(MaybeStyledComponent)
      ? MaybeStyledComponent
      : styled(MaybeStyledComponent)\`\`;

  const ParentComponent = styled.div\`
    color: cornflowerblue;

    \${TargetedComponent} {
      color: tomato;
    }
  \`
  \`\`\`
`

export default IsStyledComponent
