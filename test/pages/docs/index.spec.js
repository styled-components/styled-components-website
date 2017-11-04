'use babel'

import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import { mockRouter } from '../../../utils/test-utils'
import { Documentation } from '../../../pages/docs/index'
import i18n from '../../helpers/i18n'

mockRouter()

const wrapper = (language, props) => mount(
  <I18nextProvider i18n={i18n} initialLanguage={language}>
    <Documentation />
  </I18nextProvider>
)

test('Documentation renders correctly', () => {
  expect(wrapper('en').find(Documentation)).toMatchSnapshot()
})
