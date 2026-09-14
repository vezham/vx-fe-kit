import { HeadContent, Outlet, Scripts } from '@tanstack/react-router'

import type { AppRuntime } from '@vx/devtools'
import { APP_ID, APP_NAME, APP_VER } from '@vx/env/vite'

import type { Props } from '../shared/types'
import { Provider } from './provider'

type RootDocumentProps = Props & {
  runtime?: AppRuntime
}

const RootDocument = ({
  runtime = 'tanstack',
  ...props
}: RootDocumentProps) => {
  const options = {
    ...props,
    lang: props.lang || 'en',
    id: props.id || APP_ID,
    name: props.name || APP_NAME,
    version: props.version || APP_VER
  }

  return (
    <html lang={options.lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="root" data-vx-app={options.name || ''}>
          <Provider {...options} runtime={runtime} />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

// vx-bot/NOTE: RootComponent
const defineConfig = (props: Props) => (
  <RootDocument {...props}>
    <Outlet />
  </RootDocument>
)

export { defineConfig, Provider, RootDocument }
