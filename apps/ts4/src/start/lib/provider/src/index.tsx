// import { OverlayProvider } from '@react-aria/overlays'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode, lazy } from 'react'
import ReactDOM from 'react-dom/client'
// import { Toaster } from 'sonner'

// import { APP_NAME, __DEV__, initWorker } from '@vezham/contracts'
// import { initAxios, initStore, useLogger } from '@vezham/hooks'
// import { cn } from '@vezham/system-utils'
// import { Lockscreen, NoInternetConnection } from '@vezham/templates'
// import { ThemeProvider } from '@vezham/theme'
// import { defineAxios, defineStore, useLogger } from '@vezham/hooks'
import { cn } from '@vezham/react-utils'
import { startWorker as defineWorker } from '@vezham/shared-sw'
import { HeroUIProvider } from '@vx-oss/react'
import { Props } from './types'

const NAMESPACE = 'Core/System'

const MINUTE = 1000 * 60

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * MINUTE
      // gcTime: 60 * 24* MINUTE, // 24 hours
      // retry: 0,
    }
  }
})

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(d => ({
    default: d.ReactQueryDevtools
  }))
)

const Provider: FC<Props> = ({
  className = '',
  children,
  classTarget,
  vmode,
  strict = true,
  query = true
}) => {
  const classList = cn('vx-app', className)
  let template = (
    <HeroUIProvider>
      {/* <ThemeProvider classTarget={classTarget} vmode={vmode}>
      <OverlayProvider>
        <Toaster />
        <Lockscreen />
        <NoInternetConnection /> */}
      {/* wjdlz/TODO: Banner / AlertBanner / Announcement / Search / Header / Container */}
      <div className={classList}>{children}</div>
      {/* <div id="portal"></div> */}
      {/* </OverlayProvider> */}
      {/* </ThemeProvider> */}
    </HeroUIProvider>
  )

  if (query) {
    template = (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {/* {__DEV__ ? <ReactQueryDevtools /> : null} */}
        {template}
      </QueryClientProvider>
    )
  }

  if (strict) {
    template = <StrictMode>{template}</StrictMode>
  }
  return template
}

const preConfig = ({ name, version, store = true }: Props) => {
  // APP_NAME
  if (store) {
    // defineStore({ pretext: name, version })
  }
}

const config = ({ worker = true, axios = true, ...props }: Props) => {
  if (worker) {
    defineWorker({})
  }
  if (axios) {
    // defineAxios(props)
  }
}

const defineConfig = ({ name, ...props }: Props) => {
  // APP_NAME
  const el = document.getElementById('root') as HTMLElement
  if (el && !el.getAttribute('vx-app-mounted')) {
    preConfig(props)

    const root = ReactDOM.createRoot(el)
    root.render(<Provider {...props} />)
    el.setAttribute('vx-app-mounted', name || '')

    config(props)
  } else {
    // useLogger.log(NAMESPACE, '[provider] | root el is missing')
  }
}

export { Provider, defineConfig }
