import { APP_NAME, APP_VER } from '@vx/env/next'

import type { Props } from '../shared/types'
import { Provider } from './provider'

const RootDocument = (props: Props) => {
  const options = {
    ...props,
    name: props.name || APP_NAME,
    version: props.version || APP_VER,
    strict: false
  }

  const lang = 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <div id="root" data-vx-app={options.name || ''}>
          <Provider {...options} />
        </div>
      </body>
    </html>
  )
}

// RootComponent
const defineConfig = (props: Props) => <RootDocument {...props} />

export { defineConfig, Provider }
