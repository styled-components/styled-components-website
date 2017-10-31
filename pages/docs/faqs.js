import React from 'react'
import { I18n } from 'react-i18next'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../sections/faqs/nesting'
import ReverseSelectors from '../../sections/faqs/reverse-selectors'
import ExtendAndStyled from '../../sections/faqs/extend-and-styled-difference'
import CSSFrameworks from '../../sections/faqs/support-for-css-frameworks'

import withI18n from '../../components/withI18n'
import {
  DOCS_TRANSLATION,
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

export const FAQs = () => (
  <I18n
    ns={[DOCS_TRANSLATION, DEFAULT_TRANSLATION]}
  >
    {translate => (
      <DocsLayout
        title={translate(`${DEFAULT_TRANSLATION}:faqsTitle`)}
        description={translate('faqsDescription')}
      >
        <Nesting />
        <ReverseSelectors />
        <ExtendAndStyled />
        <CSSFrameworks />
      </DocsLayout>
    )}
  </I18n>
)

export default withI18n(FAQs)
