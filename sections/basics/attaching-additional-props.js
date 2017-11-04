import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_BASICS_TRANSLATION,
} from '../../constants/i18n'

const AttachingAdditionalProps = () => (
  <I18n ns={DOCS_BASICS_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('attachingAdditionalProps'))}
  </I18n>
)

export default AttachingAdditionalProps
