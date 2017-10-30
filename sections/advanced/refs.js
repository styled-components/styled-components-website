import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_TRANSLATION,
} from '../../constants/i18n'

const Refs = () => (
  <I18n ns={DOCS_TRANSLATION}>
    {translate => md(translate('refs'))}
  </I18n>
)

export default Refs
