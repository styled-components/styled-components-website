## Can I nest rules?

Yes: nesting is a feature intentionally ported from Sass. Used sparingly it's a
great way to lighten your code by reducing the need to create explicit classes for every element.

It can also be used by parent components to define contextual constraints that aren't properly a concern of the affected children:

```react
const EqualDivider = styled.div`
  display: flex;
  margin: 0.5rem;
  padding: 1rem;
  background: papayawhip;
  ${props => props.$vertical && "flex-direction: column;"}

  > * {
    flex: 1;

    &:not(:first-child) {
      ${props => props.$vertical ? "margin-top" : "margin-left"}: 1rem;
    }
  }
`;

const Child = styled.div`
  padding: 0.25rem 0.5rem;
  background: #BF4F74;
`;

render(
  <div>
  <EqualDivider>
    <Child>First</Child>
    <Child>Second</Child>
    <Child>Third</Child>
  </EqualDivider>
  <EqualDivider $vertical>
    <Child>First</Child>
    <Child>Second</Child>
    <Child>Third</Child>
  </EqualDivider>
  </div>
);
```

It's also incredibly convenient to co-locate media queries, since we can see at a glance
exactly how the component will respond at any resolution.

```react
const ColorChanger = styled.section`
  background: papayawhip;
  color: #BF4F74;

  @media(min-width: 768px) {
    background: mediumseagreen;
    color: papayawhip;
  }
`;

render(
  <ColorChanger href="#">
    <h2>Hello world!</h2>
  </ColorChanger>
);
```
