### `"innerRef"` prop

> The `"innerRef"` prop was removed in styled-components v4 in favor of the [React 16 `forwardRef` API](https://reactjs.org/docs/forwarding-refs.html). Just use the normal `ref` prop instead.

Passing a `ref` prop to a styled component will give you an instance of
the `StyledComponent` wrapper, but not to the underlying DOM node.
This is due to how refs work.
It's not possible to call DOM methods, like `focus`, on our wrappers directly.

To get a ref to the actual, wrapped DOM node, pass the callback to the `innerRef` prop instead.

> We don't support string refs (i.e. `innerRef="node"`), since they're already deprecated in React.

This example uses `innerRef` to save a ref to the styled input and focuses it once the user
hovers over it.

```jsx
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

class Form extends React.Component {
  render() {
    return (
      <Input
        placeholder="Hover here..."
        innerRef={x => {
          this.input = x
        }}
        onMouseEnter={() => this.input.focus()}
      />
    )
  }
}
```
