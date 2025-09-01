import { useLogger } from '@vezham/use-logger'

import Posts from './posts'

const NAMESPACE = 'App/Home'

const app = () => {
  useLogger.log(NAMESPACE, 'Hello World :)')
  useLogger.debug(NAMESPACE, 'Hello World :)')
  useLogger.info(NAMESPACE, 'Hello World :)')
  useLogger.warn(NAMESPACE, 'Hello World :)')
  useLogger.error(NAMESPACE, 'Hello World :)')
  return (
    <>
      <div>Welcome to Playground!...</div>
      <Posts />
    </>
  )
}

export default app
