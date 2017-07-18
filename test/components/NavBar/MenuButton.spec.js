import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import MenuButton from '../../../components/NavBar/MenuButton'

test('MenuButton renders correctly', () => {
  const tree = renderer.create(<MenuButton />).toJSON()

  expect(tree).toMatchSnapshot()
})
