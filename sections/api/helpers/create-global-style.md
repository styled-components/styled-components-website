import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

### `createGlobalStyle` | v4 | web-only

A helper function to generate a special `StyledComponent` that handles global styles. Normally, styled components are automatically scoped to a local CSS class and therefore isolated from other components. In the case of `createGlobalStyle`, this limitation is removed and things like CSS resets or base stylesheets can be applied.

<Table head={['Arguments', 'Description']}>
  <Row>
    <Column>
      1. <Code>TaggedTemplateLiteral</Code>
    </Column>
    <Column>A tagged template literal with your CSS and interpolations.</Column>
  </Row>
</Table>

Returns a `StyledComponent` that does not accept children. Place it at the top of your React tree and the global styles will be injected when the component is "rendered".

```jsx
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`

// later in your app

<React.Fragment>
  <GlobalStyle whiteColor />
  <Navigation /> {/* example of other top-level stuff */}
</React.Fragment>
```

Since the `GlobalStyle` component is a `StyledComponent`, that means it also has access to theming from the [`<ThemeProvider>` component](/docs/api#themeprovider) if provided.

```jsx
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }
`

// later in your app

<ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
  <React.Fragment>
    <Navigation /> {/* example of other top-level stuff */}
    <GlobalStyle whiteColor />
  </React.Fragment>
</ThemeProvider>
```
