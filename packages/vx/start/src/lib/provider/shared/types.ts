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
  lang?: string
  className?: string
  // vx-bot/NOTE: classTarget?: string
  children?: ReactNode

  // wjdlz/INFO: app prefer
  strict?: boolean
  // vx-bot/NOTE: disableAnimation?: boolean
  // vx-bot/NOTE: vmode?: Vmode

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

// vx-bot/NOTE: Language extends string = string
// vx-bot/NOTE: type Language = string

// vx-bot/NOTE: interface I18nConfig {
// vx-bot/NOTE: /**
// vx-bot/NOTE: * Supported locale codes.
// vx-bot/NOTE: *
// vx-bot/NOTE: * A page tree will be built for each language.
// vx-bot/NOTE: */
// vx-bot/NOTE: languages: Language[]
// vx-bot/NOTE: /**
// vx-bot/NOTE: * Default locale if not specified
// vx-bot/NOTE: */
// vx-bot/NOTE: defaultLanguage: Language
// vx-bot/NOTE: /**
// vx-bot/NOTE: * the fallback language when the page has no translations available for a given locale.
// vx-bot/NOTE: *
// vx-bot/NOTE: * Default to ``defaultLanguage`, no fallback when set to `null`.
// vx-bot/NOTE: */
// vx-bot/NOTE: // fallbackLanguage?: Language | null;
// vx-bot/NOTE: }

// vx-bot/NOTE: interface i18n {
// vx-bot/NOTE: locale: I18nConfig
// vx-bot/NOTE: translations: {
// vx-bot/NOTE: [K in Language]?: Partial<Translations> & { displayName?: string };
// vx-bot/NOTE: }
// vx-bot/NOTE: }
