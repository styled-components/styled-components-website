## When to use attrs?

You can pass in attributes to styled components using [attrs](/docs/basics#attaching-additional-props), but it is not always sensible to do so.

The rule of thumb is to use `attrs` when you want every instance of a styled component to have that prop, and [pass props](/docs/basics#passed-props) directly when every instance needs a different one:

```jsx
const PasswordInput = styled.input.attrs(props => ({
  // Every <PasswordInput /> should be type="password"
  type: "password"
}))``

// This specific one is hidden, so let's set aria-hidden
<PasswordInput aria-hidden="true" />
```

The same goes for props that can be inferred based on the "mode" of another prop. In this case you can set a property on `attrs` to a function that computes that prop based on other props.
