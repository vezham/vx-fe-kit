import { defineI18n } from 'fumadocs-core/i18n'

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'cn']
})

export type Locale = (typeof i18n.languages)[number]

export function resolveLocale(lang: string): Locale {
  return i18n.languages.includes(lang as Locale)
    ? (lang as Locale)
    : i18n.defaultLanguage
}
