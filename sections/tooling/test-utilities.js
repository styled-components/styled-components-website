import md from 'components/md'

const TestUtilities = () => md`
  ## Test Utilities

  [Jest Styled Components](https://github.com/styled-components/jest-styled-components) is a set
  of utilities for testing Styled Components with [Jest](https://github.com/facebook/jest).
  This package improves the snapshot testing experience and provides a
  brand new matcher to make expectations on the style rules.

  ### Installation

  \`\`\`
  npm install --dev jest-styled-components
  \`\`\`

  ### Snapshot Testing

  When we are building a UI with Styled Components, we want to make sure
  the output doesn't change unexpectedly.
  Snapshot testing is an excellent way to test React components, and this
  package makes the experience even more delightful by adding the style
  to the snapshots.

  Here's an example of a test:

  \`\`\`jsx
  import React from 'react'
  import styled from 'styled-components'
  import renderer from 'react-test-renderer'
  import 'jest-styled-components'

  const Button = styled.button\`
    color: red;
  \`

  test('it works', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  \`\`\`

  And here's an example of the resulting snapshot:

  \`\`\`jsx
  exports[\`it works 1\`] = \`
  .c0 {
    color: green;
  }

  <button
    className="c0"
  />
  \`;
  \`\`\`

  For a real world demo, check out
  [this website's repository](https://github.com/styled-components/styled-components-website/tree/master/test).

  ### \`toHaveStyleRule\`

  If we only want to check whether a particular style has been applied to
  an element, we can use the \`toHaveStyleRule\` matcher.
  This function takes two required parameters, a property (string) and
  a value (string or RegExp), and an optional object to search for rules
  nested within an at-rule or to add modifiers to the class selector.

  \`\`\`jsx
  import React from 'react'
  import styled from 'styled-components'
  import renderer from 'react-test-renderer'
  import 'jest-styled-components'

  const Button = styled.button\`
    color: red;
    @media (max-width: 640px) {
      &:hover {
        color: green;
      }
    }
  \`

  test('it works', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toHaveStyleRule('color', 'red')
    expect(tree).toHaveStyleRule('color', 'green', {
      media: '(max-width: 640px)',
      modifier: ':hover',
    })
  })
  \`\`\`
`

export default TestUtilities
