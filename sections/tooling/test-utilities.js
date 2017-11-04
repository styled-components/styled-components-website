import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_TOOLING_TRANSLATION,
} from '../../constants/i18n'

const TestUtilities = () => (
  <I18n ns={DOCS_TOOLING_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('testUtilities'))}
  </I18n>
)

export default TestUtilities
