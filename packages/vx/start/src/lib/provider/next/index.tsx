// export * from './lib/provider/src'
// import { defineI18nUI, Translations } from 'fumadocs-ui/i18n';
// import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react'

import { Provider } from './provider'

// Language extends string = string
// type Language = string

// interface I18nConfig {
//   /**
//    * Supported locale codes.
//    *
//    * A page tree will be built for each language.
//    */
//   languages: Language[]
//   /**
//    * Default locale if not specified
//    */
//   defaultLanguage: Language
//   /**
//    * the fallback language when the page has no translations available for a given locale.
//    *
//    * Default to ``defaultLanguage`, no fallback when set to `null`.
//    */
//   // fallbackLanguage?: Language | null;
// }

// interface i18n {
//   locale: I18nConfig
//   translations: {
//       [K in Language]?: Partial<Translations> & { displayName?: string };
//     }
// }

type Props = {
  children: ReactNode
  // i18n: i18n
}

const defineConfig = ({ children }: Props) => {
  // const { provider } = defineI18nUI(i18n.locale, {
  //   translations: i18n.translations
  // });

  const lang = 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        {children}
        {/* <RootProvider i18n={provider(lang)}>{children}</RootProvider> */}
      </body>
    </html>
  )
}

export { defineConfig, Provider }
