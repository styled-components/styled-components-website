import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_ADVANCED_TRANSLATION,
} from '../../constants/i18n'

const TaggedTemplateLiterals = () => (
  <I18n ns={DOCS_ADVANCED_TRANSLATION}>
    {translate => md(translate('taggedTemplateLiterals'))}
  </I18n>
)

export default TaggedTemplateLiterals
