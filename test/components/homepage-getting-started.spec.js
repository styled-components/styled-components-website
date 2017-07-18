import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { mockRouter } from '../../utils/test-utils'
import HomepageGettingStarted from '../../components/homepage-getting-started'

mockRouter()

test('HomepageGettingStarted renders correctly', () => {
  const wrapper = mount(<HomepageGettingStarted />)

  expect(wrapper).toMatchSnapshot()
})
