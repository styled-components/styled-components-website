import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_BASICS_TRANSLATION,
} from '../../constants/i18n'

const Animations = () => (
  <I18n ns={DOCS_BASICS_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('animations'))}
  </I18n>
)

export default Animations
