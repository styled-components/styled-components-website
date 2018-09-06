## Refs | v4

Passing a `ref` prop to a styled component will give you one of two things depending on the styled target:

* the underlying DOM node (if targeting a basic element, e.g. `styled.div`)
* a React component instance (if targeting a custom component e.g. extended from `React.Component`)

```react
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.setInputRef = (element) => {
      this.input = element;
    }
  }

  render() {
    return (
      <Input
        ref={this.setInputRef}
        placeholder="Hover to focus!"
        onMouseEnter={() => this.input.base.focus()}
      />
    );
  }
}

render(
  <Form />
);
```

> Using an older version of styled-components (v3 and lower) or of React? Use the [`innerRef` prop](/docs/api#innerref-prop) instead.
