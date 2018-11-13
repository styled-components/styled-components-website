## Styling via objects

If you'd rather not use template literals to write your CSS, we've got your back and have an alternative object syntax available.

```react
const Button = styled.button(props => ({
  background: props.primary ? 'palevioletred' : 'white',
  border: '2px solid palevioletred',
  borderRadius: 3,
  color: props.primary ? 'white': 'palevioletred',
  fontSize: '1em',
  margin: '1em',
  padding: '0.25em 1em',
}));

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

Some pointers on how this syntax works:

- Properties should be camelCase rather than kebab-case (e.g. `"fontSize"` instead of `"font-size"`)

- Properties that require a unit will have "px" automatically added if passed a simple number (requires styled-components v4.1 or later)

  ```jsx
  styled.button({
    fontSize: 16, // -> font-size: 16px;
    lineHeight: 1, // -> line-height: 1;
  })
  ```

- Manually-added, vendor-prefixed properties should be capitalized (`WebkitOverflowScrolling`)

- Selectors, psuedo(selectors|classes), and media queries should be nested objects

  ```jsx
  styled.button({
    fontSize: 12,

    '::before': {
      content: '"Foo"',
    },

    '> *': {
      marginLeft: 10,
    },

    '@media all and (max-width 500px)': {
      fontSize: 16,
    },
  })
  ```

- CSS rules that require actual string quotes must be explicitly requoted

  ```jsx
  styled.button({
    '::before': {
      content: '"Foo"',
    },
  })
  ```

  Conceptually this works a lot like `webpack.DefinePlugin`; the literal value is popped in and without the extra set of quotes that example would resolve to `content: Foo` instead of `content: "Foo"`.
