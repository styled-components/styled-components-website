import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  TRANSLATIONS,
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

import translations from '../../locales'

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    languages: LANGUAGES,

    // have a common namespace used around the full app
    ns: TRANSLATIONS,
    defaultNS: DEFAULT_TRANSLATION,

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true
    },

    resources: { ...translations }
  })

export default i18n
