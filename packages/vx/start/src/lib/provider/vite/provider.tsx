import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/env/vite'

import { createProvider } from '../shared/provider'

const Provider = createProvider({
  env: { APP_NAME, __DEBUG__, __DEV__ }
})

export { Provider }
