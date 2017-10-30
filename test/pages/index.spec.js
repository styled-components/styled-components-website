'use babel'

import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import { mockRouter } from '../../utils/test-utils'
import { Index } from '../../pages'
import i18n from '../helpers/i18n'

mockRouter()

test('Index renders correctly', () => {
  const wrapper = mount(<Index />)

  expect(wrapper).toMatchSnapshot()
})
