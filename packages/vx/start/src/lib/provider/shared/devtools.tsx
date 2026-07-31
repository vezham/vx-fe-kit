import { Suspense, lazy, useSyncExternalStore } from 'react'

const Devtools = lazy(() =>
  import('@vx/devtools').then(module => ({ default: module.Devtools }))
)

const emptySubscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

interface ClientDevtoolsProps {
  env: boolean
  router?: boolean
}

const ClientDevtools = ({ env, router }: ClientDevtoolsProps) => {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!env || !mounted) return null

  return (
    <Suspense fallback={null}>
      <Devtools env={env} router={router} />
    </Suspense>
  )
}

export { ClientDevtools }
