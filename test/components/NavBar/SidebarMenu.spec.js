import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import SidebarMenu from '../../../components/Nav/SidebarMenu'

import i18n from '../../helpers/i18n'

const wrapper = (language, props) => mount(
  <I18nextProvider i18n={i18n} initialLanguage={language}>
    <SidebarMenu />
  </I18nextProvider>
)

test('SidebarMenu renders correctly', () => {
  const component = wrapper('en')
  expect(component.find(SidebarMenu)).toMatchSnapshot()
})
