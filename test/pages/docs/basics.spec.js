'use babel'

import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import { mockRouter } from '../../../utils/test-utils'
import { Basics } from '../../../pages/docs/basics'
import i18n from '../../helpers/i18n'

mockRouter()

const wrapper = (language, props) => mount(
  <I18nextProvider i18n={i18n} initialLanguage={language}>
    <Basics />
  </I18nextProvider>
)

test('Basics renders correctly', () => {
  expect(wrapper('en').find(Basics)).toMatchSnapshot()
})
