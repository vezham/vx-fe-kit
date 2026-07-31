// import { defineI18nUI, Translations } from 'fumadocs-ui/i18n';
// import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react'

import { Provider } from './provider'

type Props = {
  children: ReactNode
  // i18n: i18n
}

const RootDocument = ({ children }: Props) => {
  // const { provider } = defineI18nUI(i18n.locale, {
  //   translations: i18n.translations
  // });

  const lang = 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <Provider strict={false}>{children}</Provider>
        {/* <RootProvider i18n={provider(lang)}>{children}</RootProvider> */}
      </body>
    </html>
  )
}

// RootComponent
const defineConfig = ({ children }: Props) => (
  <RootDocument>{children}</RootDocument>
)

export { defineConfig, Provider }
