import React from 'react'
import { I18n } from 'react-i18next'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import BabelPlugin from '../../sections/tooling/babel-plugin'
import TestUtilities from '../../sections/tooling/test-utilities'
import Stylelint from '../../sections/tooling/stylelint'
import StyledTheming from '../../sections/tooling/styled-theming'

import withI18n from '../../components/withI18n'
import {
  DOCS_TRANSLATION,
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

import {
  addLanguageToPath,
} from '../../utils/translations'

export const Tooling = () => (
  <I18n
    ns={[DOCS_TRANSLATION, DEFAULT_TRANSLATION]}
  >
    {(translate, { i18n }) => (
      <DocsLayout
        title={translate(`${DEFAULT_TRANSLATION}:toolingTitle`)}
        description={translate('toolingDescription')}
      >
        <BabelPlugin />
        <TestUtilities />
        <Stylelint />
        <StyledTheming />

        <NextPage
          href="/docs/faqs"
          as={addLanguageToPath(i18n, '/docs/faqs')}
          title={translate(`${DEFAULT_TRANSLATION}:faqsTitle`)}
          description={translate(`${DEFAULT_TRANSLATION}:continueOnNextPage`)}
        />
      </DocsLayout>
    )}
  </I18n>
)

export default withI18n(Tooling)
