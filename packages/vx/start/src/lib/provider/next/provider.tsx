'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode, lazy } from 'react'

import { VezhamProvider, cn } from '@vezham/react-v2'
import { defineLogger } from '@vezham/use-logger'

import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/system-utils/next/env'

import type { Props } from '../../shell/types'

const MINUTE = 1000 * 60

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * MINUTE
    }
  }
})

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(d => ({
    default: d.ReactQueryDevtools
  }))
)

defineLogger({ APP_NAME, __DEBUG__, __DEV__ })

export const Provider: FC<Props> = ({
  className = '',
  children,
  classTarget,
  strict = true,
  query = true
}) => {
  const classList = cn('vx-app', className)
  let template = (
    <VezhamProvider>
      <div className={classList}>{children}</div>
    </VezhamProvider>
  )

  if (query) {
    template = (
      <QueryClientProvider client={queryClient}>
        {__DEV__ ? <ReactQueryDevtools /> : null}
        {template}
      </QueryClientProvider>
    )
  }

  if (strict) {
    template = <StrictMode>{template}</StrictMode>
  }

  return template
}
