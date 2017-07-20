import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Text from '../../../components/NavBar/Text'

test('Text renders correctly', () => {
  const tree = renderer.create(<Text />).toJSON()

  expect(tree).toMatchSnapshot()
})
