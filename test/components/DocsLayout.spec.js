'use babel'

import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import DocsLayout from '../../components/DocsLayout'

import i18n from '../helpers/i18n'

const wrapper = (language, props) => mount(
  <I18nextProvider i18n={i18n} initialLanguage={language}>
    <DocsLayout {...props} />
  </I18nextProvider>
)

test('DocsLayout renders correctly', () => {
  const component = wrapper('en')
  expect(component.find(DocsLayout)).toMatchSnapshot()
})
