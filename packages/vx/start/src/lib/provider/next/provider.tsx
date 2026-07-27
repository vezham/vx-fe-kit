'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode, Suspense, lazy, useSyncExternalStore } from 'react'

import { VezhamProvider, cn } from '@vezham/react-v2'
import { defineLogger } from '@vezham/use-logger'

import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/env/next'

import type { Props } from '../../shell/types'

const MINUTE = 1000 * 60

const Devtools = lazy(() =>
  import('@vx/devtools').then(module => ({ default: module.Devtools }))
)

const emptySubscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * MINUTE
    }
  }
})

defineLogger({ APP_NAME, __DEBUG__, __DEV__ })

const ClientDevtools = () => {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!__DEV__ || !mounted) return null

  return (
    <Suspense fallback={null}>
      <Devtools env={__DEV__} router={false} />
    </Suspense>
  )
}

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
      <ClientDevtools />
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
