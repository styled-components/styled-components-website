import {
  DEFAULT_LANGUAGE,
} from '../constants/i18n'

export const addLanguageToPath = (i18n, path, defaultLanguage = DEFAULT_LANGUAGE) => {
  if (i18n.languages[0] === defaultLanguage) {
    return path
  }

  return `/${i18n.languages[0]}${path}`
}
