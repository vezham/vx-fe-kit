import {
  TanStackDevtools,
  TanStackDevtoolsReactPlugin
} from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Button } from '@vezham/react-v3'

import { Props } from './types'

export const Devtools = ({
  env = true,
  router = true,
  query = true
}: Props) => {
  if (!env) return null

  const plugins: TanStackDevtoolsReactPlugin[] = [
    {
      name: 'Vezham Devtools',
      render: (
        <div>
          Hello World :)
          <Button> From @vx/devtools</Button>
        </div>
      )
    }
  ]

  if (query) {
    plugins.push({
      name: 'TanStack Query',
      render: <ReactQueryDevtoolsPanel />
    })
  }

  if (router) {
    plugins.push({
      name: 'TanStack Router',
      render: <TanStackRouterDevtoolsPanel />
    })
  }

  return (
    <TanStackDevtools
      // config={{ position: 'top-right' }}
      plugins={plugins}
    />
  )
}
