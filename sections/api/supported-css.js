import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_API_TRANSLATION,
} from '../../constants/i18n'

const SupportedCSS = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('supportedCSS'))}
  </I18n>
)

export default SupportedCSS
