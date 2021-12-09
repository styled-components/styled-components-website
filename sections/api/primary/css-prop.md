### `css` prop | v4

Sometimes you don't want to create an extra component just to apply a bit of styling. The `css` prop is a convenient way to iterate on your components without settling on fixed component boundaries yet. It works on both normal HTML tags as well as components, and supports everything any styled component supports, including adapting based on props, theming and custom components.

> To enable support for the `css` prop you have to use the [Babel plugin](/docs/tooling#babel-plugin).

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

Note that you don't even have to add the import, the Babel plugin does that automatically! (unless you're using the Babel macro, see below)

#### Usage with the Babel macro

You can use the [Babel macro](/docs/tooling#babel-macro) to make this work in `create-react-app`. Unfortunately, Babel macros only run when imported so **the import can not be added automatically.** The above code works perfectly if you add the import to the macro manually:

```jsx
import styled from 'styled-components/macro'

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

#### Usage with TypeScript

To prevent TypeScript errors on the `css` prop on arbitrary elements, install `@types/styled-components` and add the following import once in your project:

```ts
import {} from 'styled-components/cssprop'
```
See <https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-446011384> for more information.
