import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import Navbar from '../../../components/Nav/Navbar'

import i18n from '../../helpers/i18n'

const wrapper = (language, props) => mount(
  <I18nextProvider i18n={i18n} initialLanguage={language}>
    <Navbar />
  </I18nextProvider>
)

test('Navbar renders correctly', () => {
  const component = wrapper('en')
  expect(component.find(Navbar)).toMatchSnapshot()
})
