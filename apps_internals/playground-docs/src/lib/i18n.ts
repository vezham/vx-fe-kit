import { defineI18n } from 'fumadocs-core/i18n'

import { vxI18n } from '../generated/vx'

export const i18n = defineI18n({
  ...vxI18n,
  languages: [...vxI18n.languages]
})

export type Locale = (typeof i18n.languages)[number]

export function resolveLocale(lang?: string): Locale {
  return i18n.languages.includes(lang as Locale)
    ? (lang as Locale)
    : i18n.defaultLanguage
}
