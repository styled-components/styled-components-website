import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import Nav from '../../../components/Nav'

test('Nav renders correctly', () => {
  const wrapper = mount(<Nav />)

  expect(wrapper).toMatchSnapshot()
})
