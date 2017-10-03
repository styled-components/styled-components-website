import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import SidebarMenu from '../../../components/Nav/SidebarMenu'

test('SidebarMenu renders correctly', () => {
  const tree = renderer.create(<SidebarMenu />).toJSON()

  expect(tree).toMatchSnapshot()
})
