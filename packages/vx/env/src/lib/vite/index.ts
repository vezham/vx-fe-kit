import { createEnv } from '../base'
import { configEnv } from './env'

const __ENV__ = createEnv(configEnv)

export const {
  __DEV__,
  __QA__,
  __PREVIEW__,
  __PRODUCTION__,

  APP_ID,
  APP_NAME,
  APP_VER,

  __DEBUG__,
  IS_BETA

  // vx-bot/REF: BASE_API_MODE
} = __ENV__
