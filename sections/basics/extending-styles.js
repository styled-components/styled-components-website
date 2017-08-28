import md from 'components/md'

const ExtendingStyles = () => md`
  ## Extending Styles | v2

  Quite frequently you might want to use a component, but change it slightly for
  a single case. Now you could pass in an interpolated function and change them
  based on some props, but that's quite a lot of effort for overriding the styles
  once.

  To do this in an easier way you can call \`extend\` on the component
  to generate another. You style it like any other styled component.
  It overrides duplicate styles from the initial component and keeps the others around.

  Here we use the button from the last section and create a special one, extending it
  with some colour-related styling.

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

  // We're extending Button with some extra styles
  const TomatoButton = Button.extend\`
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

  > This is different from passing your styled component into the \`styled()\` factory.
  > Calling \`extend\` creates a new stylesheet by extending the old one, and thus doesn't
  > generate two classes for a single component.

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

  // Use .withComponent together with .extend to both change the tag and use additional styles
  const TomatoLink = Link.extend\`
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
