import md from 'components/md'

const Refs = () => md`
  ## Refs

  Passing a \`ref\` prop to a styled component will give you an instance of
  the \`StyledComponent\` wrapper, but not to the underlying DOM node.
  This is due to how refs work.
  It's not possible to call DOM methods, like \`focus\`, on our wrappers directly.

  To get a ref to the actual, wrapped DOM node, pass the callback to the \`innerRef\` prop instead.

  > We don't support string refs (i.e. \`innerRef="node"\`), since they're already deprecated in React.

  This example uses \`innerRef\` to save a ref to the styled input and focuses it once the user
  hovers over it.

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
