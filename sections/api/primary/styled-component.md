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

This is a chainable method that attaches some props to a styled component. Two usage styles are available:

- _Function Form_: `attrs(props => ({ yourProps }))`

  The function-form of attrs receives the current props and accepts a prop object in return.

  ```jsx
  styled(Button).attrs(props => ({ role: props.as !== 'button' ? 'button' : undefined }))`
    color: red;
  `
  ```

- _Object Form_: `attrs({ yourProps })`

  The object-form of attrs is appropriate when you wish to add some static props that will always be applied and does not share concerns with other props. An example of this could be defaulting a `styled.button` to be of type "submit":

  ```jsx
  styled.button.attrs({ type: 'submit' })`
    color: red;
  `
  ```

Note that the implementation of `attrs` is quite similar in concept to `defaultProps`. Whatever props are returned from the function or given as an object are layered over the component's `defaultProps` and still can be further overriden by props set on the JSX itself:

```jsx
const FormButton = styled.button.attrs({ type: 'submit' })`
  color: red;
`

<FormButton type="reset">Reset</FormButton> // a JSX prop overrides attrs and renders type="reset"
<FormButton>Submit</FormButton>             // no JSX prop means type="submit" is used
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
