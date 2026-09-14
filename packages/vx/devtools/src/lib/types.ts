type AppRuntime = 'next' | 'tanstack' | 'tanstack-docs' | 'vite'

type DevtoolsApp = {
  environment: string
  id: string
  name: string
  runtime: AppRuntime
  version: string
}

interface Props {
  app: DevtoolsApp
  env: boolean
  router?: boolean
  query?: boolean
}

export type { AppRuntime, DevtoolsApp, Props }
