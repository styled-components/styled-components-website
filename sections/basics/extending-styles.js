import md from 'components/md'

const ExtendingStyles = () => md`
  ## Extending Styles | v2

  Quite frequently you might want to use a component, but change it slightly for
  a single case. Now, you could pass in an interpolated function and change them
  based on some props, but that's quite a lot of effort for overriding the styles
  once.

  To easily make a new component that inherits the styling of another, just wrap it
  in the \`styled()\` constructor. Here we use the button from the last section
  and create a special one, extending it with some colour-related styling:

  \`\`\`react
  // The Button from the last section without the interpolations
  const Button = styled.button\`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  \`;

  // A new component based on Button, but with some override styles
  const TomatoButton = styled(Button)\`
    color: tomato;
    border-color: tomato;
  \`;

  render(
    <div>
      <Button>Normal Button</Button>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  );
  \`\`\`

  We can see that the new \`TomatoButton\` still resembles \`Button\`, while we have only
  added two new rules.

  In really rare cases you might want to change which tag or component a styled component renders.
  For this case, we have an escape hatch. You can use the <Code>withComponent</Code> to extend
  the styles and use a different tag altogether.

  \`\`\`react
  const Button = styled.button\`
    display: inline-block;
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  \`;

  // We're replacing the <button> tag with an <a> tag, but reuse all the same styles
  const Link = Button.withComponent('a')

  // Use .withComponent together with a styled() wrapper to both change the tag and use additional styles
  const TomatoLink = styled(Link)\`
    color: tomato;
    border-color: tomato;
  \`;

  render(
    <div>
      <Button>Normal Button</Button>
      <Link>Normal Link</Link>
      <TomatoLink>Tomato Link</TomatoLink>
    </div>
  );
  \`\`\`
`

export default ExtendingStyles
