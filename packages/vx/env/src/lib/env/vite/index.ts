import { createEnv } from '../base'
import { configEnv } from './env'

const __ENV__ = createEnv(configEnv)

export const {
  __DEV__,
  __QA__,
  __PREVIEW__,
  __PRODUCTION__,

  APP_NAME,

  __DEBUG__,
  IS_BETA

  // BASE_API_URL
} = __ENV__
