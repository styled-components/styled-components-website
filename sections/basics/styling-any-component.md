## Styling any component

The `styled` method works perfectly on all of your own or any third-party component, as long as they attach the passed `className` prop to a DOM element.

> If you are using `react-native` keep in mind to use `style` instead of `className`.

```react
// This could be react-router-dom's Link for example
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```

> You can also pass tag names into the `styled()` factory call, like so: `styled("div")`. In fact, the `styled.tagname` helpers are just aliases that do the same.
