import { type BaseApiMode } from '../base'

export const configEnv = {
  MODE: process.env.NODE_ENV,

  V_IS_QA: process.env.V_IS_QA,
  V_IS_PREVIEW: process.env.V_IS_PREVIEW,

  V_APP_NAME: process.env.V_APP_NAME,

  V_IS_DEBUG: process.env.V_IS_DEBUG,
  V_IS_BETA: process.env.V_IS_BETA,

  V_BASE_API_MODE: process.env.V_BASE_API_MODE as BaseApiMode,
  V_MOCK_LOCAL_API_URL: process.env.V_MOCK_LOCAL_API_URL,
  V_MOCK_API_URL: process.env.V_MOCK_API_URL,
  V_APP_API_URL: process.env.V_APP_API_URL
}
