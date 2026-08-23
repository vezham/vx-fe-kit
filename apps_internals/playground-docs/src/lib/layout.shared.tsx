import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { type Locale, i18n } from './i18n'
import { appName, gitConfig } from './shared'

export function baseOptions(
  locale: Locale = i18n.defaultLanguage
): BaseLayoutProps {
  return {
    nav: {
      title: `${appName} :| ${locale.toUpperCase()}`
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`
  }
}
