## Attaching additional props | v2

To avoid unnecessary wrappers that just pass on some props to the rendered component, or element, you can use the [`.attrs` constructor](/docs/api#attrs). It allows you to attach additional props (or "attributes") to a component.

This way you can for example attach static props to an element, or pass a third-party prop like `activeClassName` to React Router's Link component. Furthermore you can also attach more dynamic props to a component. The `.attrs` object also takes functions, that receive the props that the component receives. The return value will be merged into the resulting props as well.

Here we render an `Input` component and attach some dynamic and static attributes to it:

```react
const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

render(
  <div>
    <Input placeholder="A small text input" />
    <br />
    <Input placeholder="A bigger text input" size="2em" />
  </div>
);
```

As you can see, we get access to our newly created props in the interpolations, and the `type` attribute is passed down to the element.

### Overriding .attrs
Notice that when wrapping styled components, `.attrs` are applied from the innermost styled component to the outermost styled component.

This allows each wrapper to **override** nested uses of `.attrs`, similarly to how css properties defined later in a stylesheet override previous declarations.

`Input`'s `.attrs` are applied first, and then `PasswordInput`'s `.attrs`:
```react
const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

// Input's attrs will be applied first, and then this attrs obj
const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  // similarly, border will override Input's border
  border: 2px solid aqua;
`;

render(
  <div>
    <Input placeholder="A bigger text input" size="2em" />
    <br />
    {/* Notice we can still use the size attr from Input */}
    <PasswordInput placeholder="A bigger password input" size="2em" />
  </div>
);
```
This is why `PasswordInput` is of a password type, but still uses the `size` attribute from `Input`.
