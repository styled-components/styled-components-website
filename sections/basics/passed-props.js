import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_TRANSLATION,
} from '../../constants/i18n'

const PassedProps = () => (
  <I18n ns={DOCS_TRANSLATION}>
    {translate => md(translate('passedProps'))}
  </I18n>
)

export default PassedProps
