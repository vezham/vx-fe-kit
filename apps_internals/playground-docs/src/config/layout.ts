import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { localizedUrl } from '@vx/start/runtime/docs'

import { type Locale, i18n } from '@app/docs'
import { vxCore } from '@generated/vx'

export function baseOptions(
  locale: Locale = i18n.defaultLanguage
): BaseLayoutProps {
  return {
    nav: {
      title: `${vxCore.shortName} :| ${locale.toUpperCase()}`
    },
    links: [
      {
        text: 'UI/docs',
        url: localizedUrl(locale, '/ui-docs/overview'),
        active: 'nested-url'
      },
      {
        text: 'UI/notebook',
        url: localizedUrl(locale, '/ui-notebook/overview'),
        active: 'nested-url'
      }
    ]
  }
}
