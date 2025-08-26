import { useLogger } from '@vezham/use-logger'
import Posts from './posts'

const NAMESPACE = 'App'

const app = () => {
  useLogger.log(NAMESPACE, 'Hello World :)')
  useLogger.debug(NAMESPACE, 'Hello World :)')
  useLogger.info(NAMESPACE, 'Hello World :)')
  useLogger.warn(NAMESPACE, 'Hello World :)')
  useLogger.error(NAMESPACE, 'Hello World :)')
  return (
    <>
      <h1>Hello World</h1>
      <Posts />
    </>
  )
}

export default app
