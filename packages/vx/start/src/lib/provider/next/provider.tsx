'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode } from 'react'

import { VezhamProvider, cn } from '@vezham/react-v2'
import { defineLogger } from '@vezham/use-logger'

import { Devtools } from '@vx/devtools'
import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/env/next'

import type { Props } from '../../shell/types'

const MINUTE = 1000 * 60

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * MINUTE
    }
  }
})

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
    <>
      <VezhamProvider>
        <div className={classList}>{children}</div>
      </VezhamProvider>
      <Devtools env={__DEV__} router={false} />
    </>
  )

  if (query) {
    template = (
      <QueryClientProvider client={queryClient}>{template}</QueryClientProvider>
    )
  }

  if (strict) {
    template = <StrictMode>{template}</StrictMode>
  }

  return template
}
