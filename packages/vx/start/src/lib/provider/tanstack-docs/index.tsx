import { Outlet, useParams } from '@tanstack/react-router'
import type { I18nAPI } from 'fumadocs-core/i18n'
import { openapiTranslations } from 'fumadocs-openapi/i18n'
import { i18nProvider, uiTranslations } from 'fumadocs-ui/i18n'
import {
  RootProvider,
  type RootProviderProps
} from 'fumadocs-ui/provider/tanstack'

import { normalizeLocale } from '../../runtime/docs'
import type { Props } from '../shared/types'
import { RootDocument } from '../tanstack'
import { DocsSearchDialog } from './search'

type DocsConfigProps = Props & {
  rootProvider?: Omit<RootProviderProps, 'children'>
}

type DocsRootComponentOptions<Language extends string> = {
  i18n: I18nAPI<Language>
  translations?: Partial<Record<Language, Record<string, string>>>
}

const defineConfig = ({ rootProvider, ...props }: DocsConfigProps = {}) => {
  const { search, ...rootProviderProps } = rootProvider ?? {}

  return (
    <RootDocument {...props}>
      <RootProvider
        {...rootProviderProps}
        search={{ SearchDialog: DocsSearchDialog, ...search }}>
        <Outlet />
      </RootProvider>
    </RootDocument>
  )
}

function createRootComponent<Language extends string>({
  i18n,
  translations: overrides
}: DocsRootComponentOptions<Language>) {
  const translations = i18n
    .translations()
    .extend(uiTranslations())
    .extend(openapiTranslations())
    .add(overrides ?? {})

  return function DocsRootComponent() {
    const { lang = i18n.defaultLanguage } = useParams({ strict: false })
    const locale = normalizeLocale(i18n, lang)

    return defineConfig({
      lang: locale,
      rootProvider: {
        i18n: i18nProvider(translations, locale)
      }
    })
  }
}

export { createRootComponent, defineConfig, DocsSearchDialog }
