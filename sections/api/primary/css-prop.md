### `css` prop | v4

Sometimes you don't want to create an extra component just to apply a bit of styling. The `css` prop is a convenient way to iterate on your components without settling on fixed component boundaries yet. It works on both normal HTML tags as well as components.

> To enable support for the `css` prop you have to use the [Babel plugin](/docs/tooling#babel-plugin). (or [Babel macro](/docs/tooling#babel-macro) for create-react-app users)

```jsx
render(
  <>
    <div
      css={`
        background: papayawhip;
        height: 50px;
        width: 50px;
      `}
    />
    <Button
      css={`
        padding: 0.5em 1em;
      `}
    />
  </>
)
```
