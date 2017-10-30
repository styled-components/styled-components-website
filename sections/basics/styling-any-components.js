import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_TRANSLATION,
} from '../../constants/i18n'

const StylingAnyComponents = () => (
  <I18n ns={DOCS_TRANSLATION}>
    {translate => md(translate('stylingAnyComponents'))}
  </I18n>
)

export default StylingAnyComponents
