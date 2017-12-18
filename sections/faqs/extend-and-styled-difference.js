import md from 'components/md'

const ExtendAndStyled = () => md`
  ## When should I use \`styled()\`?

  ### Behind the scenes
  The \`styled()\` factory generates new component styles with a new class. The classnames are
  then passed to the React component via the \`className\` prop.
  Calling \`extend\` creates new component styles by extending the old one, and thus doesn't
  generate two classes for a single component. (\`styled()\` factory does that)

  ### Which one should you use
  We recommend to use \`.extend\` where possible for internal \`StyledComponents\`.
  Try to use the \`styled()\` factory however for external or cross-file components
  where it isn't clear what it's going to be when writing the wrapper \`StyledComponent\`.

  Keep in mind that wrapping your own components with styled() is not recommended.
  It should always be attempted to only have StyledComponents and not wrap any wrappers
  and containers at a higher level. Otherwise your styling logic will be scattered across
  multiple files, and it will become tempting to use child selectors to target elements
  inside your containers. This of course increases the specificity of rules we generate,
  which can lead to more code and styled() wrappers which try to compensate for this up
  in your component hierarchy. Instead, you can keep your UI code clean by bundling
  your styling at the lowest level, and utilise themes, inheritance, mixins, props,
  and even "reverse selectors".

  Also if you haven't read the section on [\`Styling any components\`](/docs/basics#styling-any-components)
  and [\`extend\`](/docs/basics#extending-styles) yet, they contain more information and examples.
`

export default ExtendAndStyled
