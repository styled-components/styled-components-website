## Can I use CSS frameworks?

Integrating an existing CSS framework with styled-components is really easy! You can use its existing class names alongside your components.

Consider you have an existing app with some CSS that have the classes: `.small` and `.big`. Try to swap out the `.small` class with `.big` in the example below:

```react
const Button = styled.button.attrs({
  className: "small",
})`
  background: black;
  color: white;
  cursor: pointer;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Styled Components</Button>
    <Button>The new way to style components!</Button>
  </div>
);
```

Please do read about [the attrs method](/docs/api#attrs) to learn how arbitary props can be passed down to a styled component without wrapping it.

If the framework has a bunch of raw global CSS that needs to be included on the page, you can add it using the [`createGlobalStyle` API](/docs/api#createglobalstyle). This is also useful for things like CSS resets.

> Note that for styled-components v3 and below, the previous API for global styles was [`injectGlobal`](/docs/api#injectglobal).
