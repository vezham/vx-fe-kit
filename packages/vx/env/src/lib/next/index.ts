import { createEnv } from '../base'
import { configEnv } from './env'

// wjdlz/NOTE: for adding the env in next.config.ts
export { configEnv }

const __ENV__ = createEnv(configEnv)

export const {
  __DEV__,
  __QA__,
  __PREVIEW__,
  __PRODUCTION__,

  APP_NAME,
  APP_VER,

  __DEBUG__,
  IS_BETA

  // BASE_API_MODE
} = __ENV__
