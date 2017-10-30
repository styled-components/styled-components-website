import React from 'react'
import { I18n } from 'react-i18next'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Theming from '../../sections/advanced/theming'
import Refs from '../../sections/advanced/refs'
import Security from '../../sections/advanced/security'
import ExistingCSS from '../../sections/advanced/existing-css'
import MediaTemplates from '../../sections/advanced/media-templates'
import TaggedTemplateLiterals from '../../sections/advanced/tagged-template-literals'
import ServerSideRendering from '../../sections/advanced/server-side-rendering'

import withI18n from '../../components/withI18n'
import {
  DOCS_TRANSLATION,
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

import {
  addLanguageToPath,
} from '../../utils/translations'

export const Advanced = () => (
  <I18n
    ns={[DOCS_TRANSLATION, DEFAULT_TRANSLATION]}
  >
    {(translate, { i18n }) => (
      <DocsLayout
        title={translate(`${DEFAULT_TRANSLATION}:advancedTitle`)}
        description={translate('advancedDescription')}
      >
        <Theming />
        <Refs />
        <Security />
        <ExistingCSS />
        <MediaTemplates />
        <TaggedTemplateLiterals />
        <ServerSideRendering />

        <NextPage
          href={{
            pathname: '/docs/api'
          }}
          as={{
            pathname: addLanguageToPath(i18n, '/docs/api')
          }}
          title={translate(`${DEFAULT_TRANSLATION}:apiTitle`)}
          description={translate(`${DEFAULT_TRANSLATION}:continueOnNextPage`)}
        />
      </DocsLayout>
    )}
  </I18n>
)

export default withI18n(Advanced)
