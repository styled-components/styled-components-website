import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

### `StyledComponent`

A styled React component. This is returned when you
call `styled.tagname` or `styled(Component)` with styles.

This component can take any prop. It passes it on to the HTML node if it's a valid attribute,
otherwise it only passes it into interpolated functions. (see [Tagged Template Literal](/docs/advanced/#tagged-template-literals))

You can pass an arbitrary classname to a styled component without problem and it will be applied
next to the styles defined by the styled call.
(e.g. `<MyStyledComp className="bootstrap__btn" />`)

#### .attrs

This is a chainable method that attaches some props to a styled component.
The first and only argument is an object that will be merged into the rest of the
component's props. The `attrs` object accepts the following values:

<Table head={['Values', 'Description']}>
  <Row>
    <Column>
      <Code>Prop Value</Code>
    </Column>
    <Column>
      These can be of any type, except functions. They'll stay static and
      will be merged into the existing component props.
    </Column>
  </Row>

  <Row>
    <Column>
      <Code>Prop Factory</Code>
    </Column>
    <Column>
      A function that receives the props that are passed into the component
      and computes a value, that is then going to be merged into the
      existing component props.
    </Column>
  </Row>
</Table>

Returns another `StyledComponent`.

```react
// import styled from 'styled-components'

const Input = styled.input.attrs({
  type: 'text',
  size: props => (props.small ? 5 : undefined),
})`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 1em;
  padding: ${props => props.padding};

  ::placeholder {
    color: palevioletred;
  }
`

render(
  <>
    <Input small placeholder="Small" />
    <Input placeholder="Normal" />
    <Input padding="2em" placeholder="Padded" />
  </>
)
```

Learn more about this constructor in the [Attaching Additional Props](/docs/basics#attaching-additional-props) section.

#### .withComponent

This is a method that creates a new `StyledComponent` with a different tag or component
applied to it, but all the same rules of the one it's called on.

<Table head={['Arguments', 'Description']}>
  <Row>
    <Column>
      1. <Code>component</Code> / <Code>tagname</Code>
    </Column>
    <Column>Either a valid react component or a tagname like `'div'`.</Column>
  </Row>
</Table>

Returns a new `StyledComponent` with the new tag / component being applied when it's used.

You can see it in action in the [Extending Styles](/docs/basics#extending-styles) section.

> As of styled-components v4 the `withComponent` API is now a candidate for deprecation. In all likelihood, you probably want to use the new [`"as"` prop](#as-polymorphic-prop) to simply switch what element/component being rendered since the `withComponent` API is destructive toward styles if the lowest-wrapped component is a `StyledComponent`.

#### `"as"` polymorphic prop | v4

If you want to keep all the styling you've applied to a component but just switch out what's being ultimately rendered (be it a different HTML tag or a different custom component), you can use the `"as"` prop to do this at runtime.

```react
// import styled from "styled-components";

const Component = styled.div`
  color: red;
`;

render(
  <Component
    as="button"
    onClick={() => alert('It works!')}
  >
    Hello World!
  </Component>
)
```

This sort of thing is very useful in use cases like a navigation bar where some of the items should be links and some just buttons, but all be styled the same way.
