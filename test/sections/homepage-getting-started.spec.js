import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { I18nextProvider } from 'react-i18next'
import { mockRouter } from '../../utils/test-utils'
import HomepageGettingStarted from '../../sections/homepage-getting-started'
import i18n from '../helpers/i18n'

mockRouter()

const wrapper = (props, language) => mount(
  <I18nextProvider i18n={i18n} initialLanguage={language}>
    <HomepageGettingStarted {...props} />
  </I18nextProvider>
)

test('HomepageGettingStarted renders correctly', () => {
  expect(wrapper({}, 'en').find(HomepageGettingStarted)).toMatchSnapshot()
})

test('HomepageGettingStarted renders in spanish', () => {
  expect(wrapper({}, 'es').find(HomepageGettingStarted)).toMatchSnapshot()
})
