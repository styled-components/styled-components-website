'use babel'

import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import { mockRouter } from '../../../utils/test-utils'
import { Documentation } from '../../../pages/docs/index'
import i18n from '../../helpers/i18n'

mockRouter()

test('Documentation renders correctly', () => {
  const wrapper = mount(<Documentation />)

  expect(wrapper).toMatchSnapshot()
})

test('Documentation renders in spanish', () => {
  const wrapper = mount(
    <I18nextProvider i18n={i18n} initialLanguage="es">
      <Documentation />
    </I18nextProvider>
  )

  expect(wrapper.find(Documentation)).toMatchSnapshot()
})
