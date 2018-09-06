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
import { withTheme } from "styled-components"

class MyComponent extends React.Component {
  render() {
    console.log("Current theme: ", this.props.theme);
    // ...
  }
}

export default withTheme(MyComponent)
```

Only use this if you need to get the theme as a prop.
If you just need to set a valid stylesheet property, you can use normal theming for this.
Check out the section on [Theming](/docs/advanced#theming") to read more on how to use this.
