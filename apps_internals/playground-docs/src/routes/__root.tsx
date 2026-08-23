import { createRootRoute, useParams } from '@tanstack/react-router'
import { i18nProvider, uiTranslations } from 'fumadocs-ui/i18n'

import { defineConfig } from '@vx/start/tanstack-docs'

import { tanstackHead } from '@generated/vx'
import { i18n, resolveLocale } from '@src/lib/i18n'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: RootComponent
})

const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: 'English'
    },
    cn: {
      displayName: '中文',
      'Search(search trigger)': '搜尋'
    }
  })

function RootComponent() {
  const { lang = i18n.defaultLanguage } = useParams({ strict: false })
  const locale = resolveLocale(lang)

  return defineConfig({
    lang: locale,
    rootProvider: {
      i18n: i18nProvider(translations, locale)
    }
  })
}
