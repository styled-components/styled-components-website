## Can I use CSS frameworks?

Integrating an existing CSS framework with styled-components is really easy! You can use its existing class names alongside your components.

For example, imagine you have an existing app with two classes you want to use again: `.small` and `.big`. If you want the class to always be attached to the component, you should use [the `attrs` method](/docs/api#attrs) to attach it. If you want to attach it only in some cases you can use the `className` props like you always have!

```react
// Using .attrs, we attach the .small class to every <Button />
const Button = styled.button.attrs(props => ({
  className: "small",
}))`
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
    {/* Here we attach the class .big to this specific instance of the Button */}
    <Button className="big">The new way to style components!</Button>
  </div>
);
```

If the framework has a bunch of raw global CSS that needs to be included on the page, you can add it using the [`createGlobalStyle` API](/docs/api#createglobalstyle). This is also useful for things like CSS resets.

> Note that for styled-components v3 and below, the previous API for global styles was [`injectGlobal`](/docs/api#injectglobal).
