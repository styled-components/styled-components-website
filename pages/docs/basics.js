import React from 'react'
import { I18n } from 'react-i18next'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Motivation from '../../sections/basics/motivation'
import GettingStarted from '../../sections/basics/getting-started'
import Installation from '../../sections/basics/installation'
import PassedProps from '../../sections/basics/passed-props'
import AdaptingBasedOnProps from '../../sections/basics/adapting-based-on-props'
import StylingAnyComponents from '../../sections/basics/styling-any-components'
import ExtendingStyles from '../../sections/basics/extending-styles'
import AttachingAdditionalProps from '../../sections/basics/attaching-additional-props'
import Animations from '../../sections/basics/animations'
import ReactNative from '../../sections/basics/react-native'

import withI18n from '../../components/withI18n'
import {
  DOCS_TRANSLATION,
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

import {
  addLanguageToPath,
} from '../../utils/translations'

export const Basics = () => (
  <I18n
    ns={[DOCS_TRANSLATION, DEFAULT_TRANSLATION]}
  >
    {(translate, { i18n }) => (
      <DocsLayout
        title={translate(`${DEFAULT_TRANSLATION}:basicsTitle`)}
        description={translate('basicsDescription')}
      >
        <Motivation />
        <Installation />
        <GettingStarted />
        <PassedProps />
        <AdaptingBasedOnProps />
        <StylingAnyComponents />
        <ExtendingStyles />
        <AttachingAdditionalProps />
        <Animations />
        <ReactNative />

        <NextPage
          href={{
            pathname: '/docs/advanced'
          }}
          as={{
            pathname: addLanguageToPath(i18n, '/docs/advanced')
          }}
          title={translate(`${DEFAULT_TRANSLATION}:advancedTitle`)}
          description={translate(`${DEFAULT_TRANSLATION}:continueOnNextPage`)}
        />
      </DocsLayout>)}
  </I18n>
)

export default withI18n(Basics)
