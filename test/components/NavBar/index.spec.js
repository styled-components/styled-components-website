import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import NavBar from '../../../components/NavBar'

test('NavBar renders correctly', () => {
  const wrapper = mount(<NavBar />)

  expect(wrapper).toMatchSnapshot()
})
