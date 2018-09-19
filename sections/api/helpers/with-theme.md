import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

### `withTheme`

This is a higher order component factory to get the current theme from a `ThemeProvider` and
pass it to your component as a `theme` prop.

<Table head={['Arguments', 'Description']}>
  <Row>
    <Column>
      1. <Code>Component</Code>
    </Column>
    <Column>
      Any valid React component that can handle a <Code>theme</Code> prop.
    </Column>
  </Row>
</Table>

Returns the passed component inside a wrapper (higher order component).
The passed component will receive a `theme` prop with the current theme object.

```jsx
import { withTheme } from 'styled-components'

class MyComponent extends React.Component {
  render() {
    console.log('Current theme: ', this.props.theme)
    // ...
  }
}

export default withTheme(MyComponent)
```

> All styled components [automatically receive the theme as a prop](/docs/advanced#theming), so this is only necessary if you wish to access the theme for other reasons.
