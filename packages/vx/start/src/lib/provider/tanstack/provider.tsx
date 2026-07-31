import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/env/vite'

import { ClientDevtools, createProvider } from '../shared'

const Provider = createProvider({
  env: { APP_NAME, __DEBUG__, __DEV__ },
  renderDevtools: () => <ClientDevtools env={__DEV__} />
})

export { Provider }
