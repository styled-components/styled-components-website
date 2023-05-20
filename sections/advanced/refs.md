## Refs | v4

Passing a `ref` prop to a styled component will give you one of two things depending on the styled target:

- the underlying DOM node (if targeting a basic element, e.g. `styled.div`)
- a React component instance (if targeting a custom component e.g. extended from `React.Component`)

```react
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #BF4F74;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return (
      <Input
        ref={this.inputRef}
        placeholder="Hover to focus!"
        onMouseEnter={() => {
          this.inputRef.current.focus()
        }}
      />
    );
  }
}

render(
  <Form />
);
```

> Using an older version of styled-components (below 4.0.0) or of React? Use the [`innerRef` prop](/docs/api#innerref-prop) instead.
