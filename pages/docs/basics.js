import React from 'react'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'
import { I18n } from 'react-i18next'

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

import {
  DOCS_TRANSLATION,
} from '../../../constants/i18n'

const Basics = () => (
  <I18n ns={[DOCS_TRANSLATION, DEFAULT_TRANSLATION]}>
    {translate => (
      <DocsLayout
        title={translate(`${DEFAULT_TRANSLATION}:basics`)}
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
          href="/docs/advanced"
          title={translate(`${DEFAULT_TRANSLATION}:advanced`)}
        />
      </DocsLayout>)}
  </I18n>
)

export default Basics
