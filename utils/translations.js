import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
} from '../constants/i18n'

const defaultValues = () => ({
  defaultLanguage: DEFAULT_LANGUAGE,
  languages: LANGUAGES,
})

export const isValidLanguage = (i18n, { languages } = defaultValues()) =>
  languages.indexOf(i18n.languages[0]) >= 0

export const addLanguageToPath = (i18n, path, {
  defaultLanguage,
} = defaultValues()) => {
  if (
    !isValidLanguage(i18n)
    || i18n.languages[0] === defaultLanguage
  ) {
    return path
  }

  return `/${i18n.languages[0]}${path}`
}
