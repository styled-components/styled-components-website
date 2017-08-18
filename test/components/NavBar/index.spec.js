import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import Navbar from '../../../components/Navbar'

test('Navbar renders correctly', () => {
  const wrapper = mount(<Navbar />)

  expect(wrapper).toMatchSnapshot()
})
