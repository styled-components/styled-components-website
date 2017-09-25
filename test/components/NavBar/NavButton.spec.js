import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import NavButton from '../../../components/Nav/NavButton'

test('NavButton renders correctly', () => {
  const tree = renderer.create(<NavButton />).toJSON()

  expect(tree).toMatchSnapshot()
})
