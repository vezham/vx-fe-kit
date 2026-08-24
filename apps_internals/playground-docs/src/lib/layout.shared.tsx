import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { type Locale, i18n } from './i18n'
import { appName } from './shared'

export function baseOptions(
  locale: Locale = i18n.defaultLanguage
): BaseLayoutProps {
  return {
    nav: {
      title: `${appName} :| ${locale.toUpperCase()}`
    },
    links: [
      {
        text: 'UI/docs',
        url: '/ui-docs/overview',
        active: 'nested-url'
      },
      {
        text: 'UI/notebook',
        url: '/ui-notebook/overview',
        active: 'nested-url'
      }
    ]
  }
}
