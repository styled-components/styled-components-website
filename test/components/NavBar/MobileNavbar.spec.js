import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import MobileNavbar from '../../../components/Nav/MobileNavbar'

test('MobileNavbar renders correctly', () => {
  const tree = renderer.create(<MobileNavbar />).toJSON()

  expect(tree).toMatchSnapshot()
})
