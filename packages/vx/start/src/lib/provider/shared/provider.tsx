import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, ReactNode } from 'react'
import { StrictMode } from 'react'

import { VezhamProvider, cn } from '@vezham/react-v2'
import { defineLogger } from '@vezham/use-logger'

import type { Props, ProviderEnv } from './types'

const MINUTE = 1000 * 60

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * MINUTE
        // gcTime: 60 * 24* MINUTE, // 24 hours
        // retry: 0,
      }
    }
  })

interface CreateProviderProps {
  env: ProviderEnv
  renderDevtools?: () => ReactNode
}

const createProvider = ({ env, renderDevtools }: CreateProviderProps) => {
  const queryClient = createQueryClient()

  defineLogger(env)

  const Provider: FC<Props> = ({
    // id
    className = '',
    // classTarget,
    children,

    strict = true,
    // disableAnimation
    // vmode,

    version,
    query = true
  }) => {
    const classList = cn('vx-app', className)
    let template = (
      <>
        <VezhamProvider>
          {/* wjdlz/NOTE: 
            data-vx-app="mail"
            data-vx-app-name="Vezham Mail"
            data-vx-app-version="1.0.0"
            data-vx-app-env="development"
            data-vx-app-framework="vite"

            TODO: data-vx-app-name, data-vx-app-env, data-vx-app-framework 
          */}
          <div data-vx-app-version={version} className={classList}>
            {children}
          </div>
          {/* <ThemeProvider classTarget={classTarget} vmode={vmode}>
          <Lockscreen />
          <NoInternetConnection /> */}
          {/* wjdlz/TODO: Announcement / Search-Spotlight */}
          {/* <div id="portal"></div> */}
          {/* </ThemeProvider> */}
        </VezhamProvider>
        {renderDevtools?.()}
      </>
    )

    if (query) {
      template = (
        <QueryClientProvider client={queryClient}>
          {template}
        </QueryClientProvider>
      )
    }

    if (strict) {
      template = <StrictMode>{template}</StrictMode>
    }

    return template
  }

  return Provider
}

export { createProvider }
