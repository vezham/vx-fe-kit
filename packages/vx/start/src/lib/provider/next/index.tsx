// import { defineI18nUI, Translations } from 'fumadocs-ui/i18n';
// import { RootProvider } from 'fumadocs-ui/provider/next';
import { APP_NAME } from '@vx/env/next'

import type { Props } from '../shared/types'
import { Provider } from './provider'

const RootDocument = ({ name = APP_NAME, ...props }: Props) => {
  // const { provider } = defineI18nUI(i18n.locale, {
  //   translations: i18n.translations
  // });

  const lang = 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <div id="root" data-vx-app-mounted={name || ''}>
          <Provider strict={false} {...props} />
          {/* <RootProvider i18n={provider(lang)}>{children}</RootProvider> */}
        </div>
      </body>
    </html>
  )
}

// RootComponent
const defineConfig = (props: Props) => <RootDocument {...props} />

export { defineConfig, Provider }
