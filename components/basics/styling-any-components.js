import md from '../md'

const StylingAnyComponents = () => md`
  ## Styling any components

  The \`styled\` method works perfectly on all of your own or any third-party
  components as well, as long as they're accepting the \`className\` prop.

  > If you are using \`react-native\` keep in mind to use \`style\` instead of \`className\`.

  If you're using any external library, you can consider using this pattern to turn them
  into styled components. The same pattern works for your own components as well, if you
  need some components to stay unstyled on their own.

  \`\`\`react
  // This could be react-router's Link for example
  const Link = ({ className, children }) => (
    <a className={className}>
      {children}
    </a>
  )

  const StyledLink = styled(Link)\`
    color: palevioletred;
    font-weight: bold;
  \`;

  render(
    <div>
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
    </div>
  );
  \`\`\`

  Consider carefully whether to wrap your own components in a styled component, when it isn't necessary.
  You will disable the automatic whitelisting of props, and reverse the recommended order of styled
  components and structural components.

  You can also pass tag names into the \`styled()\` factory call, like so: \`styled('div')\`.
  In fact, the \`styled.tagname\` helpers are just aliases that do the same.

  > styled-components always generates a real stylesheet with classes.
  > The classnames are then passed to the React component (including third party components)
  > via the \`className\` prop.
`

export default StylingAnyComponents
