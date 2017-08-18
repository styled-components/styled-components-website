import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Logo from '../../../components/Navbar/Logo'

test('Logo renders correctly', () => {
  const tree = renderer.create(<Logo />).toJSON()

  expect(tree).toMatchSnapshot()
})
