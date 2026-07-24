// import { OverlayProvider } from '@react-aria/overlays'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode, Suspense, lazy, useEffect, useState } from 'react'

import { VezhamProvider, cn } from '@vezham/react-v2'
// import { initWorker } from '@vezham/contracts'
// import { Lockscreen, NoInternetConnection } from '@vezham/templates'
// import { ThemeProvider } from '@vezham/theme'
// import { defineAxios, defineStore } from '@vezham/hooks'
// import { startWorker as defineWorker } from '@vezham/shared-sw'
// import { cn } from '@vezham/system-utils'

import { defineLogger } from '@vezham/use-logger'

// import { useLogger } from '@vezham/use-logger'

import { APP_NAME, __DEBUG__, __DEV__ } from '@vx/env/vite'

import { Props } from './types'

// const NAMESPACE = '@vx/start'

const MINUTE = 1000 * 60

const Devtools = lazy(() =>
  import('@vx/devtools').then(module => ({ default: module.Devtools }))
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * MINUTE
      // gcTime: 60 * 24* MINUTE, // 24 hours
      // retry: 0,
    }
  }
})

defineLogger({ APP_NAME, __DEBUG__, __DEV__ })

const ClientDevtools = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!__DEV__ || !mounted) return null

  return (
    <Suspense fallback={null}>
      <Devtools env={__DEV__} />
    </Suspense>
  )
}

const Provider: FC<Props> = ({
  className = '',
  children,
  classTarget,
  // vmode,
  strict = true,
  query = true
}) => {
  const classList = cn('vx-app', className)
  let template = (
    <>
      <VezhamProvider>
        {/* <ThemeProvider classTarget={classTarget} vmode={vmode}>
        <Lockscreen />
        <NoInternetConnection /> */}
        {/* wjdlz/TODO: Announcement / Search-Spotlight */}
        <div className={classList}>{children}</div>
        {/* <div id="portal"></div> */}
        {/* </ThemeProvider> */}
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

// const preConfig = ({ name, version, store = true }: Props) => {
//   if (store) {
//     // defineStore({ pretext: name, version })
//   }
// }

// const config = ({ worker = true, axios = true, ...props }: Props) => {
//   if (worker) {
//     // defineWorker({})
//   }
//   if (axios) {
//     // defineAxios(props)
//   }
// }

// const defineConfig = ({ name = APP_NAME, ...props }: Props) => {
//   const el = document.getElementById('root') as HTMLElement
//   if (el && !el.getAttribute('vx-app-mounted')) {
//     preConfig(props)

//     const root = ReactDOM.createRoot(el)
//     root.render(<Provider {...props} />)
//     el.setAttribute('vx-app-mounted', name || '')

//     config(props)
//   } else {
//     useLogger.log(NAMESPACE, '[provider] | root el is missing')
//   }
// }

// const defineConfig = ({ name = APP_NAME, ...props }: Props) => {
//   const el = document.getElementById('root') as HTMLElement
//   if (el && !el.getAttribute('vx-app-mounted')) {
//     preConfig(props)

//     const root = ReactDOM.createRoot(el)
//     root.render(<Provider {...props} />)
//     el.setAttribute('vx-app-mounted', name || '')

//     config(props)
//   } else {
//     useLogger.log(NAMESPACE, '[provider] | root el is missing')
//   }
// }

export { Provider }
