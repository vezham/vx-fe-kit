export type T_BASE_API_URL = 'api' | 'mock' | 'local'

export type T_ENV = {
  MODE?: string

  V_IS_QA?: string
  V_IS_PREVIEW?: string

  V_APP_NAME?: string

  V_IS_DEBUG?: string
  V_IS_BETA?: string

  V_BASE_API_URL?: T_BASE_API_URL
  V_MOCK_LOCAL_API_URL?: string
  V_MOCK_API_URL?: string
  V_APP_API_URL?: string
}

export const createEnv = (__ENV__: Partial<T_ENV> = {}) => {
  // @vx/NOTE: run env/sandbox By Stages - dev, qa, preview (alpha + beta), live (production)
  const __DEV__ = __ENV__.MODE === 'development'
  const __QA__ = __ENV__.V_IS_QA === 'true'
  const __PREVIEW__ = __ENV__.V_IS_PREVIEW === 'true'
  const __PRODUCTION__ = __ENV__.MODE === 'production'

  // @vx/NOTE: app config
  const APP_NAME = __ENV__.V_APP_NAME || 'vx-app'

  // @vx/NOTE: app config By env
  const __DEBUG__ = __ENV__.V_IS_DEBUG === 'true'
  const IS_BETA = __ENV__.V_IS_BETA === 'true'

  // @vx/NOTE: app - server/api endpoint
  // const BASE_API_URL: T_BASE_API_URL = __ENV__.V_BASE_API_URL || 'api'

  // @vx/NOTE: for ws debugger
  if (__DEV__ && __DEBUG__) console.table(__ENV__)

  // wjdlz/NOTE: for start
  return {
    // @vx/app-env
    __DEV__,
    __QA__,
    __PREVIEW__,
    __PRODUCTION__,

    // @vx/app
    APP_NAME,
    __DEBUG__,
    IS_BETA

    // BASE_API_URL
  }
}

// wjdlz/NOTE: use-axios | getApiServerEndPoint | config: AxiosRequestConfig
// const defineServerEnv = () => {
//   if (BASE_API_URL === 'local') {
//     return __ENV__.V_MOCK_LOCAL_API_URL
//   }

//  if (BASE_API_URL === 'mock') {
//     return __ENV__.V_MOCK_API_URL
//   }

//   // wjdlz/TODO : NOH - on impl axios
//   // -@ts-expect-error | wjdlz/NOTE: domain_type - handled in start
//   // } else if (config.domain_type === IAM.DomainType.SANDBOX) {
//   //   return __ENV__.V_APP_SANDBOX_API_URL
//   //   // @ts-expect-error | wjdlz/NOTE: domain_type - handled in start
//   // } else if (config.domain_type === IAM.DomainType.DC) {
//   //   return __ENV__.V_APP_DC_API_URL

//   // if (BASE_API_URL == "api" || config.domain_type === IAM.DomainType.DEFAULT)
//   return __ENV__.V_APP_API_URL
// }
