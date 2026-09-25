export type BaseApiMode = 'api' | 'mock' | 'local'
type Environment = 'development' | 'production' | 'preview' | 'qa' | 'unknown'

type Props = {
  MODE?: string

  V_IS_QA?: string
  V_IS_PREVIEW?: string

  V_APP_ID?: string
  V_APP_NAME?: string
  V_APP_VER?: string

  V_IS_DEBUG?: string
  V_IS_BETA?: string

  V_BASE_API_MODE?: BaseApiMode
  V_MOCK_LOCAL_API_URL?: string
  V_MOCK_API_URL?: string
  V_APP_API_URL?: string
}

export const createEnv = (__ENV__: Partial<Props>) => {
  // vx-bot/NOTE: run env/sandbox By Stages - dev, qa, preview (alpha + beta), live (production)
  const __DEV__ = __ENV__.MODE === 'development'
  const __QA__ = __ENV__.V_IS_QA === 'true'
  const __PREVIEW__ = __ENV__.V_IS_PREVIEW === 'true'
  const __PRODUCTION__ = __ENV__.MODE === 'production'
  let APP_ENV: Environment = 'unknown'

  if (__DEV__) {
    APP_ENV = 'development'
  } else if (__QA__) {
    APP_ENV = 'qa'
  } else if (__PREVIEW__) {
    APP_ENV = 'preview'
  } else if (__PRODUCTION__) {
    APP_ENV = 'production'
  }

  // vx-bot/NOTE: app config
  const APP_ID = __ENV__.V_APP_ID || 'vx-app'
  const APP_NAME = __ENV__.V_APP_NAME || 'Vx App'
  const APP_VER = __ENV__.V_APP_VER || '1.0.0.alpha'

  // vx-bot/NOTE: app config By env
  const __DEBUG__ = __ENV__.V_IS_DEBUG === 'true'
  const IS_BETA = __ENV__.V_IS_BETA === 'true'

  // vx-bot/NOTE: app - server/api endpoint
  // const BaseApiMode: BaseApiMode = __ENV__.V_BASE_API_MODE || 'api'

  // vx-bot/NOTE: for ws debugger
  if (__DEV__ && __DEBUG__) console.table(__ENV__)

  // wjdlz/NOTE: for start
  return {
    // vx-bot/INFO: @vx/app-env
    __DEV__,
    __QA__,
    __PREVIEW__,
    __PRODUCTION__,
    APP_ENV,

    // vx-bot/INFO: @vx/app
    APP_ID,
    APP_NAME,
    APP_VER,

    __DEBUG__,
    IS_BETA

    // vx-bot/REF: BASE_API_MODE
  }
}

// wjdlz/NOTE: use-axios | getApiServerEndPoint | config: AxiosRequestConfig
// const defineServerEnv = () => {
//   if (BaseApiMode === 'local') {
//     return __ENV__.V_MOCK_LOCAL_API_URL
//   }

// vx-bot/TODO: Restore mode-aware API endpoint selection with the axios integration.
// if (BaseApiMode === 'mock') {
//   return __ENV__.V_MOCK_API_URL
// }
//
// Type expectation was needed because domain_type is handled in @vx/start.
// } else if (config.domain_type === IAM.DomainType.SANDBOX) {
//   return __ENV__.V_APP_SANDBOX_API_URL
// } else if (config.domain_type === IAM.DomainType.DC) {
//   return __ENV__.V_APP_DC_API_URL
// }
//
// if (BaseApiMode === 'api' || config.domain_type === IAM.DomainType.DEFAULT)
// return __ENV__.V_APP_API_URL
// }
