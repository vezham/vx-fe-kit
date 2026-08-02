import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/env/vite'

import { ClientDevtools } from '../shared/devtools'
import { createProvider } from '../shared/provider'

const Provider = createProvider({
  env: { APP_NAME, __DEBUG__, __DEV__ },
  renderDevtools: () => <ClientDevtools env={__DEV__} />
})

export { Provider }
