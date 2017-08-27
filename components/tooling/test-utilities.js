import React from 'react'
import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'
import Code from '../Code'
import Link from '../Link'

const installation = `
yarn add --dev jest-styled-components
`.trim()

const snapshotTesting = `
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
`.trim()

const snapshot = `
exports[\`it works 1\`] = \`
.c0 {
  color: green;
}

<button
  className="c0"
/>
\`;
`.trim()

const toHaveStyleRule = `
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
`.trim()

const TestUtilities = () =>
  <SectionLayout title="Test Utilities">
    <p>
      <Link inline href="https://github.com/styled-components/jest-styled-components">
        Jest Styled Components
      </Link>{' '}
      is a set of utilities for testing Styled Components with{' '}
      <Link inline href="https://github.com/facebook/jest">Jest</Link>.
      This package improves the snapshot testing experience and provides a
      brand new matcher to make expectations on the style rules.
    </p>
    <SectionLayout sub title="Installation">
      <CodeBlock code={installation} language="node" />
    </SectionLayout>
    <SectionLayout sub title="Snapshot Testing">
      <p>
        When we are building a UI with Styled Components, we want to make sure
        the output doesn't change unexpectedly.
        Snapshot testing is an excellent way to test React components, and this
        package makes the experience even more delightful by adding the style
        to the snapshots.
      </p>
      <p>An example of test:</p>
      <CodeBlock code={snapshotTesting} language="jsx" />
      <p>An example of snapshot:</p>
      <CodeBlock code={snapshot} language="js" />
      <p>
        For real world demo, checkout this website's{' '}
        <Link inline href="https://github.com/styled-components/styled-components-website/tree/master/test">
         repository
        </Link>
        .
      </p>
    </SectionLayout>
    <SectionLayout sub title="toHaveStyleRule">
      <p>
        If we only want to check whether a particular style has been appled to
        an element, we can use the <Code>toHaveStyleRule</Code> matcher.
        This function takes two required parameters, property (string) and
        value (string or RegExp), and an optional object to search for rules
        nested within an At-rule or to add modifiers to the class selector.
      </p>
      <CodeBlock code={toHaveStyleRule} language="jsx" />
    </SectionLayout>
  </SectionLayout>

export default TestUtilities
