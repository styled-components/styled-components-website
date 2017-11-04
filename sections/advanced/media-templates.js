import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_ADVANCED_TRANSLATION,
} from '../../constants/i18n'

const MediaTemplates = () => (
  <I18n ns={DOCS_ADVANCED_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('mediaTemplates'))}
  </I18n>
)

export default MediaTemplates
