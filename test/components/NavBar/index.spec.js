'use babel'

import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import Nav from '../../../components/Nav'

import i18n from '../../helpers/i18n'

const wrapper = (language, props) => mount(
  <I18nextProvider initialLanguage={language} i18n={i18n}>
    <Nav />
  </I18nextProvider>
)

test('Nav renders correctly', () => {
  expect(wrapper('en').find(Nav)).toMatchSnapshot()
})
