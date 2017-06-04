import React from 'react'

import SectionLayout from '../SectionLayout'
import LiveEdit from '../LiveEdit'

const sampleEqualDivider = (`
const EqualDivider = styled.div\`
  display: flex;
  margin: 0.5rem;
  padding: 1rem;
  background: papayawhip;
  \${props => props.vertical && 'flex-direction: column;'}

  > * {
    flex: 1;

    &:not(:first-child) {
      \${props => props.vertical ? 'margin-top' : 'margin-left'}: 1rem;
    }
  }
\`

const Child = styled.div\`
  padding: 0.25rem 0.5rem;
  background: palevioletred;
\`

render(
  <div>
  <EqualDivider>
    <Child>First</Child>
    <Child>Second</Child>
    <Child>Third</Child>
  </EqualDivider>
  <EqualDivider vertical>
    <Child>First</Child>
    <Child>Second</Child>
    <Child>Third</Child>
  </EqualDivider>
  </div>
);
`).trim()

const sampleMediaQueries = (`
const ColorChanger = styled.section\`
  background: papayawhip;
  color: palevioletred;

  @media(min-width: 768px) {
    background: mediumseagreen;
    color: papayawhip;
  }
\`;
render(
  <ColorChanger href="#">
    <h2>Hello world!</h2>
  </ColorChanger>
)
`).trim()

const Nesting = () => (
  <SectionLayout title="Can I nest rules?">
    <p>Yes: nesting is a feature intentionally ported from Sass. Used sparingly it's a great way to lighten your code by reducing the need to create explicit classes for every element.</p>
    <p>It can also be used by parent components to define contextual constraints that aren't properly a concern of the affected children:</p>
    <LiveEdit code={sampleEqualDivider} noInline />
    <p>It's also incredibly convenient to co-locate media queries, since we can see at a glance exactly how the component will respond at any resolution.</p>
    <LiveEdit code={sampleMediaQueries} noInline />
  </SectionLayout>
)

export default Nesting
