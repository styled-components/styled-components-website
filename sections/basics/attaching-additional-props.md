## Attaching additional props | v2

To avoid unnecessary wrappers that just pass on some props to the rendered component,
or element, you can use the `.attrs` constructor. It allows you to attach
additional props (or "attributes") to a component.

This way you can for example attach static props to an element, or pass a third-party prop
like `activeClassName` to React Router's Link component. Furthermore you can also
attach more dynamic props to a component. The `.attrs` object also takes functions,
that receive the props that the component receives. The return value will be merged into the
resulting props as well.

Here we render an `Input` component and attach some dynamic and static attributes
to it:

```react
const Input = styled.input.attrs({
  // we can define static props
  type: "password",

  // or we can define dynamic ones
  margin: props => props.size || "1em",
  padding: props => props.size || "1em"
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

render(
  <div>
    <Input placeholder="A small text input" size="1em" />
    <br />
    <Input placeholder="A bigger text input" size="2em" />
  </div>
);
```

As you can see, we get access to our newly created props in the interpolations, and
the `type` attribute is passed down to the element.

