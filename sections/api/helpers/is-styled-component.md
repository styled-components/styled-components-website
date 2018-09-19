import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

### `isStyledComponent`

A utility to help identify styled components.

<Table head={['Arguments', 'Description']}>
  <Row>
    <Column>
      1. <Code>Function</Code>
    </Column>
    <Column>
      Any function expected to possibly be a styled component or React component
      wrapped in a styled component
    </Column>
  </Row>
</Table>

Returns true if the passed function is a valid styled components-wrapped component class. It can be useful for determining if a component needs to be wrapped such that it can be used as a component selector:

```jsx
import React from 'react'
import styled, { isStyledComponent } from 'styled-components'
import MaybeStyledComponent from './somewhere-else'

let TargetedComponent = isStyledComponent(MaybeStyledComponent)
  ? MaybeStyledComponent
  : styled(MaybeStyledComponent)``

const ParentComponent = styled.div`
  color: cornflowerblue;

  ${TargetedComponent} {
    color: tomato;
  }
`
```
