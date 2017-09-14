import md from 'components/md'

const CSSFrameworks = () => md`
  ## What is the difference between \`Comp.extend\` and \`styled(Comp)\`?


  You have two choices to add additional styles to a component or a styled component,
  one is using [\`Comp.extend\`](/docs/basics#extending-styles) and the other is wrapping your
  component in the styled method like this: [\`styled(Comp)\`](/docs/basics#styling-any-components).

  The styled method works perfectly on all of your own or any third-party components
  as well, but the extend method can only be used on a styled component only.

  Styled method always generates a real stylesheet with classes. The classnames are
  then passed to the React component (including third party components) via the className prop.
  Calling \`extend\` creates a new stylesheet by extending the old one, and thus doesn't
  generate two classes for a single component.

  [\`Comp.extend\`](/docs/basics#extending-styles) and the other is wrapping your
  component in the styled method like this: [\`styled(Comp)\`](/docs/basics#styling-any-components).

  Please do read about [\`Styling any components\`](/docs/basics#styling-any-components). and [\`extend\`](/docs/basics#extending-styles).
`

export default CSSFrameworks
