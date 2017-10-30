import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_BASICS_TRANSLATION,
} from '../../constants/i18n'

const AdaptingBasedOnProps = () => (
  <I18n ns={DOCS_BASICS_TRANSLATION}>
    {translate => md(translate('adaptingBasedOnProps'))}
  </I18n>
)

export default AdaptingBasedOnProps
