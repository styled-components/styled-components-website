import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_FAQS_TRANSLATION,
} from '../../constants/i18n'

const ReverseSelectors = () => (
  <I18n ns={DOCS_FAQS_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('reverseSelectors'))}
  </I18n>
)

export default ReverseSelectors
