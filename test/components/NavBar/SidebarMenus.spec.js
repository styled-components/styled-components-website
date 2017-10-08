import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { DocsSidebarMenu } from '../../../components/Nav/SidebarMenus'

test('DocsSidebarMenu renders correctly', () => {
  const tree = renderer.create(<DocsSidebarMenu />).toJSON()

  expect(tree).toMatchSnapshot()
})
