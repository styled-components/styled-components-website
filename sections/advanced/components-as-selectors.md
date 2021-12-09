## Referring to other components

> This is a **web-specific** API and you **won't** be able to use it in react-native.

There are many ways to apply contextual overrides to a component's styling. That being said,
it rarely is easy without rigging up a well-known targeting CSS selector paradigm
and then making them accessible for use in interpolations.

styled-components solves this use case cleanly via the "component selector" pattern. Whenever
a component is created or wrapped by the styled() factory function, it is also assigned a
stable CSS class for use in targeting. This allows for extremely powerful composition patterns
without having to fuss around with naming and avoiding selector collisions.

A practical example: here, our Icon component defines its response to the parent Link being hovered:

```react
const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  ${Link}:hover & {
    fill: rebeccapurple;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;

  &::before {
    content: '◀';
    margin: 0 10px;
  }
`;

render(
  <Link href="#">
    <Icon viewBox="0 0 20 20">
      <path d="M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z"/>
    </Icon>
    <Label>Hovering my parent changes my style!</Label>
  </Link>
);
```

We could have nested the color-changing rule within our Link component, but then we'd have to
consider both sets of rules to understand why Icon behaves as it does.

### Caveat

This behaviour is only supported within the context of _Styled_ Components:
attempting to mount `B` in the following example will fail because component
`A` is an instance of React.Component not a Styled Component.

```jsx
class A extends React.Component {
  render() {
    return <div />
  }
}

const B = styled.div`
  ${A} {
  }
`
```

The error thrown - `Cannot call a class as a function` - occurs because the
styled component is attempting to call the component as an interpolation function.

However, wrapping `A` in a styled() factory makes it eligible for interpolation -- just
make sure the wrapped component passes along `className`.

```jsx
class A extends React.Component {
  render() {
    return <div className={this.props.className} />
  }
}

const StyledA = styled(A)``

const B = styled.div`
  ${StyledA} {
  }
`
```
