import md from 'components/md'

const HTMLAttributeWarnings = () => md`
  ## Why am I getting HTML attribute warnings?

  The warning message below indicates that non-standard attributes are being attached to
  HTML DOM elements such as \`div\` or \`a\`. If you are seeing this warning message, it is likely that
  you or a library you are using is attaching props as attributes to HTML DOM elements.

  \`\`\`sh
  Warning: Received 'true' for a non-boolean attribute
  \`\`\`

  ### Styling a Standard React Component with \`styled()\`
  When you style a standard React component with \`styled(Comp)\`, we pass through all the props to
  the resulting component:

  \`\`\`sh
  const Comp = (props) => {
    return <div className={props.className}>{props.text}</div>
  }

  const StyledComp = styled(Comp)\`
    color: red;
  \`

  <StyledComp text="Hello World" />
  \`\`\`

  This will render:
  \`\`\`sh
  <div class="[generated class]">Hello World</div>
  \`\`\`
  The text prop is passed through the wrapper and into the original component.

  ### Styling a React Component that passes props as attributes
  If the component being wrapped by \`styled()\` happens to pass down the props onto the HTML DOM element
  as attributes, you may unexpectedly pass non-standard attributes as props after wrapping.

  \`\`\`sh
  const Link = (props) => {
    return (
      <a {...props} className={props.className}>{props.text}</a>
    )
  }

  const StyledComp = styled(Link)\`
    color: \${props.red ? 'red' : 'blue'};
  \`

  <StyledComp text="Click" href="https://www.styled-components.com/" red />
  \`\`\`

  This will render:
  \`\`\`sh
  <a text="Click" href="https://www.styled-components.com/" red=true class="[generated class]">Click</a>
  \`\`\`

  React will then warn on non-standard attributes being attached such as the boolean for the red attribute in this example.

  > There is nothing we can do from the \`styled-components\` side of things to avoid this error. You'll have to either work around
  this by introducing a filtering component or by not passing any non-standard attributes to that component.
`

export default HTMLAttributeWarnings
