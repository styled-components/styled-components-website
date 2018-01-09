import md from 'components/md'

const WhenToUseAttrs = () => md`
  ## When to use attrs?

  You can pass in attributes to styled components using [attrs](/docs/basics#attaching-additional-props), but
  it is not always sensible to do so.

  The rule of thumb is to use \`attrs\` when you want every instance of a styled
  component to have that prop, and pass props directly when every instance needs a
  different one:

  \`\`\`js
  const PasswordInput = styled.input.attrs({
    // Every <PasswordInput /> should be type="password"
    type: 'password'
  })\`\`

  // This specific one is hidden, so let's set aria-hidden
  <PasswordInput aria-hidden="true" />
  \`\`\`
`

export default WhenToUseAttrs
