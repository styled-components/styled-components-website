import md from 'components/md'

const Refs = () => md`
  ## Refs

  Passing a \`ref\` prop to a styled component will give you an instance of
  the \`StyledComponent\` wrapper, but not to the underlying DOM node.
  This is due to how refs work.
  It's not possible to call DOM methods, like \`focus\`, on our wrappers directly.

  To get a ref to the actual, wrapped DOM node, pass the callback to the \`innerRef\` prop instead.

  > \`innerRef\` supports callback refs (i.e. \`ref={comp => this.xyz = comp}\`) and refs using [\`React.createRef()\`](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) (available since React 16.3). We don't support string refs (i.e. \`innerRef="node"\`), since they're already deprecated in React.

  The following examples use \`innerRef\` to save a ref to the styled input and focus it once the user
  hovers over it.

  **Example using \`React.createRef()\`**:

  \`\`\`react
  const Input = styled.input\`
    padding: 0.5em;
    margin: 0.5em;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 3px;
  \`;

  class Form extends React.Component {
    constructor(props) {
        super(props)
        this.input = React.createRef()
    }
    render() {
      return (
        <Input
          placeholder="Hover here..."
          innerRef={this.input}
          onMouseEnter={() => this.input.current.focus()}
        />
      );
    }
  }

  render(
    <Form />
  );
  \`\`\`

  **Example using a callback**:

  \`\`\`react
  const Input = styled.input\`
    padding: 0.5em;
    margin: 0.5em;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 3px;
  \`;

  class Form extends React.Component {
    render() {
      return (
        <Input
          placeholder="Hover here..."
          innerRef={x => { this.input = x }}
          onMouseEnter={() => this.input.focus()}
        />
      );
    }
  }

  render(
    <Form />
  );
  \`\`\`
`

export default Refs
