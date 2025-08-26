/// <reference types="vite/client" />

// const isVite = typeof import.meta !== 'undefined' && 'env' in import.meta
// const __ENV__ = isVite ? import.meta.env : process.env
const __ENV__ = import.meta.env || process.env

// @vx/NOTE: run env/sandbox By Stages - dev, qa, preview (alpha + beta), live (production)
export const __DEV__ = __ENV__.MODE === 'development'
export const __QA__ = __ENV__.V_IS_QA === 'true'
export const __PREVIEW__ = __ENV__.V_IS_PREVIEW === 'true'
export const __PRODUCTION__ = __ENV__.MODE === 'production'

// @vx/NOTE: app config
export const APP_NAME = __ENV__.V_APP_NAME || 'vx-app'

// @vx/NOTE: app config By env
export const __DEBUG__ = __ENV__.V_IS_DEBUG === 'true'
export const IS_BETA = __ENV__.V_IS_BETA === 'true'

// @vx/NOTE: app - server/api endpoint
type T_BASE_API_URL = 'api' | 'mock' | 'local'
export const BASE_API_URL: T_BASE_API_URL = __ENV__.V_BASE_API_URL || 'api'

// @vx/NOTE: for ws debugger
if (__DEV__ && __DEBUG__) console.table(__ENV__)

// wjdlz/NOTE: for start
export const defineEnv = {
  // @vx/app-env
  __DEV__,
  __QA__,
  __PREVIEW__,
  __PRODUCTION__,

  // @vx/app
  APP_NAME,
  __DEBUG__,
  IS_BETA
}

// wjdlz/NOTE: use-axios | getApiServerEndPoint | config: AxiosRequestConfig
export const defineServerEnv = () => {
  if (BASE_API_URL === 'local') {
    return __ENV__.V_MOCK_LOCAL_API_URL
  } else if (BASE_API_URL === 'mock') {
    return __ENV__.V_MOCK_API_URL
    // wjdlz/TODO : NOH - on impl axios
    // -@ts-expect-error | wjdlz/NOTE: domain_type - handled in start
    // } else if (config.domain_type === IAM.DomainType.SANDBOX) {
    //   return __ENV__.V_APP_SANDBOX_API_URL
    //   // @ts-expect-error | wjdlz/NOTE: domain_type - handled in start
    // } else if (config.domain_type === IAM.DomainType.DC) {
    //   return __ENV__.V_APP_DC_API_URL
  } else {
    // if (BASE_API_URL == "api" || config.domain_type === IAM.DomainType.DEFAULT)
    return __ENV__.V_APP_API_URL
  }
}
