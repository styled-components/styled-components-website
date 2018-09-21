import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

### `TaggedTemplateLiteral`

This is what you pass into your styled calls – a tagged template literal.
This is an ES6 language feature. You can learn more about them in the
[Tagged Template Literals](/docs/advanced#tagged-template-literals) section.

<Table head={['Inputs', 'Description']}>
  <Row>
    <Column>
      <Code>Rule</Code>
    </Column>
    <Column>Any CSS rules (string)</Column>
  </Row>
  <Row>
    <Column>
      <Code>Interpolation</Code>
    </Column>
    <Column>
      This can either be a string or a function. Strings are combined with the
      rules as-is. Functions will receive the styled component's props as the
      first and only argument.
    </Column>
  </Row>
</Table>

Read more about how to adapt styling based on props in the
[Adapting based on props](/docs/basics#adapting-based-on-props) section.

The properties that are passed into an interpolated function get attached a special
property, `theme`, which is injected by a higher level `ThemeProvider` component.
Check the section on [Theming](/docs/advanced#theming) for more information on this.

```react
// import styled from 'styled-components'

const padding = '3em'

const Section = styled.section`
  color: white;

  /* Pass variables as inputs */
  padding: ${padding};

  /* Adjust the background from the properties */
  background: ${props => props.background};
`

render(
  <Section background="cornflowerblue">
    ✨ Magic
  </Section>
)
```

You can also return objects from interpolations or input objects directly, and they'll be
treated as inline styles. However this is highly discouraged, as the CSS syntax has support
for pseudo selectors, media queries, nesting, etc., which the object syntax doesn't.
