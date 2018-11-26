### `css` prop | v4

Sometimes you don't want to create an extra component just to apply a bit of styling. The `css` prop is a convenient way to iterate on your components without settling on fixed component boundaries yet. It works on both normal HTML tags as well as components, and supports everything any styled component supports, including adapting based on props, theming and custom components.

> To enable support for the `css` prop you have to use the [Babel plugin](/docs/tooling#babel-plugin). (or [Babel macro](/docs/tooling#babel-macro) for create-react-app users)

```jsx
<div
  css={`
    background: papayawhip;
    color: ${props => props.theme.colors.text};
  `}
/>
<Button
  css="padding: 0.5em 1em;"
/>
```

Under the hood, the Babel plugin turns any element with a `css` prop into a styled component. For example, the above code becomes:

```javascript
import styled from 'styled-components';

const StyledDiv = styled.div`
  background: papayawhip;
  color: ${props => props.theme.colors.text};
`

const StyledButton = styled(Button)`
  padding: 0.5em 1em;
`

<StyledDiv />
<StyledButton />
```
