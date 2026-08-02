/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AxiosRequestConfig } from 'axios'
import type { ReactNode } from 'react'

interface AxiosProps {
  onRequest?: (config: AxiosRequestConfig) => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => {}
}

interface Props extends AxiosProps {
  id?: string
  className?: string
  // classTarget?: string
  children?: ReactNode

  // wjdlz/INFO: app prefer
  strict?: boolean
  // disableAnimation?: boolean
  // vmode?: Vmode

  // wjdlz/INFO: app impl
  name?: string
  version?: string
  query?: boolean
  store?: boolean
  worker?: boolean
  axios?: boolean
}

interface ProviderEnv {
  APP_NAME: string
  __DEBUG__: boolean
  __DEV__: boolean
}

export type { Props, ProviderEnv }

export const NAMESPACE = '@vx/start'

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
