import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { mockRouter } from '../../utils/test-utils'
import Index from '../../pages'

mockRouter()

test('Index renders correctly', () => {
  const wrapper = mount(<Index />)

  expect(wrapper).toMatchSnapshot()
})
