const i18n = require('i18next')
const XHR = require('i18next-xhr-backend')
const LanguageDetector = require('i18next-browser-languagedetector')
const {
    LANGUAGES,
    DEFAULT_LANGUAGE,
    TRANSLATIONS,
    DEFAULT_TRANSLATION,
} = require('../constants/i18n')

const options = {
  fallbackLng: DEFAULT_LANGUAGE,
  languages: LANGUAGES,
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE

  // have a common namespace used around the full app
  ns: TRANSLATIONS,
  defaultNS: DEFAULT_TRANSLATION,

  debug: false,
  // debug: process.env.NODE_ENV !== 'production', // debug when not in production
  saveMissing: true,

  // loadPath: '/locales/{{lng}}/{{ns}}.yml',

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  }
}

// for browser use xhr backend to load translations and browser lng detector
if (process.browser) {
  i18n
    .use(XHR)
    // .use(Cache)
    .use(LanguageDetector)
}

// initialize if not already initialized
if (!i18n.isInitialized) i18n.init(options)

// a simple helper to getInitialProps passed on loaded i18n data
i18n.getInitialProps = (req, namespaces) => {
  if (!namespaces) namespaces = i18n.options.defautlNS
  if (typeof namespaces === 'string') namespaces = [namespaces]

  req.i18n.toJSON = () => null // do not serialize i18next instance and send to client

  const initialI18nStore = {}
  req.i18n.languages.forEach((l) => {
    initialI18nStore[l] = {}
    namespaces.forEach((ns) => {
      initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l]
        ? req.i18n.services.resourceStore.data[l][ns] || {}
        : {}
    })
  })

  return {
    i18n: req.i18n, // use the instance on req - fixed language on request (avoid issues in race conditions with lngs of different users)
    initialI18nStore,
    initialLanguage: req.i18n.language
  }
}

module.exports = i18n
