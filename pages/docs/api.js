import React from 'react'
import { I18n } from 'react-i18next'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Primary from '../../sections/api/primary'
import Helpers from '../../sections/api/helpers'
import SupportedCSS from '../../sections/api/supported-css'
import Flow from '../../sections/api/flow'
import TypeScript from '../../sections/api/typescript'

import withI18n from '../../components/withI18n'
import {
  DOCS_TRANSLATION,
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

import {
  addLanguageToPath,
} from '../../utils/translations'

const APIReference = () => (
  <I18n
    ns={[DOCS_TRANSLATION, DEFAULT_TRANSLATION]}
  >
    {(translate, { i18n }) => (
      <DocsLayout
        title={translate(`${DEFAULT_TRANSLATION}:apiTitle`)}
        description={translate('apiDescription')}
      >
        <Primary />
        <Helpers />
        <SupportedCSS />
        <Flow />
        <TypeScript />

        <NextPage
          href="/docs/tooling"
          as={addLanguageToPath(i18n, '/docs/tooling')}
          title={translate(`${DEFAULT_TRANSLATION}:toolingTitle`)}
          description={translate(`${DEFAULT_TRANSLATION}:continueOnNextPage`)}
        />
      </DocsLayout>
    )}
  </I18n>
)

export default withI18n(APIReference)
