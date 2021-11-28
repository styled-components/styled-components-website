## Extending Styles

Quite frequently you might want to use a component, but change it slightly for a single case. Now, you could pass in an interpolated function and change them based on some props, but that's quite a lot of effort for overriding the styles once.

To easily make a new component that inherits the styling of another, just wrap it in the `styled()` constructor. Here we use the button from the last section and create a special one, extending it with some color-related styling:

```react
// The Button from the last section without the interpolations
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);
```

We can see that the new `TomatoButton` still resembles `Button`, while we have only added two new rules.

In some cases you might want to change which tag or component a styled component renders. This is common when building a navigation bar for example, where there are a mix of anchor links and buttons but they should be styled identically.

For this situation, we have an escape hatch. You can use the [`"as" polymorphic prop`](/docs/api#as-polymorphic-prop) to dynamically swap out the element that receives the styles you wrote:

```react
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="#">Link with Button styles</Button>
    <TomatoButton as="a" href="#">Link with Tomato Button styles</TomatoButton>
  </div>
);
```

This works perfectly fine with custom components too!

```react
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />

render(
  <div>
    <Button>Normal Button</Button>
    <Button as={ReversedButton}>Custom Button with Normal Button styles</Button>
  </div>
);
```

> If you are still on an older version than v4, you can use the [`.withComponent`](/docs/api#withcomponent) or [`.extend`](/docs/api#deprecated-extend) API's to achieve the same result as with the [`"as" prop`](/docs/api#as-polymorphic-prop), but note that this is discouraged as with v4 [`.extend` was removed](/releases#breaking-changes) and `.withComponent` was marked as a candidate for future deprecation.
