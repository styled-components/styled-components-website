## Passed props

styled-components pass on their props using this algorithm:

1. If the styled target is a simple element (e.g. \`styled.div\`), pass through [any known HTML attribute](https://github.com/emotion-js/emotion/blob/master/next-packages/is-prop-valid/src/props.js) to the DOM

2. If the styled target is a custom React component (e.g. \`styled(MyComponent)\`), pass through all props

> For the first step, we do not maintain an exhaustive mapping of HTML element to allowed attributes because it would be prohibitively large and difficult to maintain. There is currently a [v5 roadmap item](https://github.com/styled-components/styled-components/pull/1682#issuecomment-399496564) to tackle this issue in the near future.

This example shows how all props of the Input component are passed on to the
DOM node that is mounted, as with React elements.

```react
  // Create an Input component that'll render an <input> tag with some styles
  const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    color: ${props => props.inputColor || "palevioletred"};
    background: papayawhip;
    border: none;
    border-radius: 3px;
  `;

  // Render a styled text input with a placeholder of "@mxstbr", and one with a value of "@geelen"
  render(
    <div>
      <Input placeholder="@mxstbr" value="@probablyup" type="text" />
      <Input value="@geelen" type="text" inputColor="rebeccapurple" />
    </div>
  );
```

Note that the "inputColor" prop is not passed to the DOM because it isn't a known HTML attribute. It's generally a safe bet that if you write all your styling props as camelCase they won't end up in the DOM as clutter for simple elements.
