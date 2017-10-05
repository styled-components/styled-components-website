import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { mockRouter } from '../../utils/test-utils'
import Ecosystem from '../../pages/ecosystem'

mockRouter()

test('Ecosystem renders correctly', () => {
  const wrapper = mount(<Ecosystem />)

  expect(wrapper).toMatchSnapshot()
})
