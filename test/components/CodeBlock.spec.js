import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import CodeBlock from '../../components/CodeBlock'

test('CodeBlock renders correctly', () => {
  const tree = renderer.create(<CodeBlock />).toJSON()

  expect(tree).toMatchSnapshot()
})
