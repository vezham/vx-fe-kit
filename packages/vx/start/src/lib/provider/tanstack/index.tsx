import { HeadContent, Outlet, Scripts } from '@tanstack/react-router'

import { APP_NAME, APP_VER } from '@vx/env/vite'

import type { Props } from '../shared/types'
import { Provider } from './provider'

const RootDocument = (props: Props) => {
  const options = {
    ...props,
    name: props.name || APP_NAME,
    version: props.version || APP_VER
  }

  const lang = 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="root" data-vx-app={options.name || ''}>
          <Provider {...options} />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

// RootComponent
const defineConfig = (props: Props) => (
  <RootDocument {...props}>
    <Outlet />
  </RootDocument>
)

export { RootDocument, defineConfig, Provider }
