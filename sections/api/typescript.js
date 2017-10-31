import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_API_TRANSLATION,
} from '../../constants/i18n'

const TypeScript = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('typescript'))}
  </I18n>
)

export default TypeScript
