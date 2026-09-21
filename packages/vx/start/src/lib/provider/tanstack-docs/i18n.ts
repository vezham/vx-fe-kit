import type { I18nAPI } from '@vezham/docs-core/i18n'

const displayNameLanguageCode = (language: string) => {
  return language === 'cn' ? 'zh' : language
}

export const getLanguageDisplayName = (language: string) => {
  const languageCode = displayNameLanguageCode(language)

  try {
    return (
      new Intl.DisplayNames([languageCode], { type: 'language' }).of(
        languageCode
      ) ?? language
    )
  } catch {
    return language
  }
}

export const createDocsTranslations = <Language extends string>(
  i18n: I18nAPI<Language>,
  overrides?: Partial<Record<Language, Record<string, string>>>
) => {
  const translations: Partial<Record<Language, Record<string, string>>> = {}

  for (const language of i18n.languages) {
    translations[language] = {
      displayName: getLanguageDisplayName(language),
      ...overrides?.[language]
    }
  }

  return translations
}
