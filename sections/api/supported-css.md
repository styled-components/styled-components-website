## Supported CSS

Within a styled component, we support all of CSS plus nesting. Since we generate an
actual stylesheet and not inline styles, whatever works in CSS works in styled-components!

```react
const Example = styled.div`
  /* all declarations will be prefixed */
  padding: 2em 1em;
  background: papayawhip;

  /* pseudo selectors work as well */
  &:hover {
    background: #BF4F74;
  }

  /* media queries are no problem */
  @media (max-width: 600px) {
    background: tomato;

    /* nested rules work as expected */
    &:hover {
      background: yellow;
    }
  }

  > p {
    /* descendant-selectors work as well, but are more of an escape hatch */
    text-decoration: underline;
  }

  /* Contextual selectors work as well */
  html.test & {
    display: none;
  }
`;

render(
  <Example>
    <p>Hello World!</p>
  </Example>
);
```

Ampersands (`&`) get replaced by our generated, unique classname for that styled
component, making it easy to have complex logic.
