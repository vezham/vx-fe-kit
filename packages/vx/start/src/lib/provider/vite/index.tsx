import ReactDOM from 'react-dom/client'

import { useLogger } from '@vezham/use-logger'

import { APP_NAME } from '@vx/env/vite'

import { config, preConfig } from '../shared/config'
import { ClientDevtools } from '../shared/devtools'
import { NAMESPACE, type Props } from '../shared/types'
import { Provider } from './provider'

const defineConfig = ({ name = APP_NAME, ...props }: Props) => {
  const el = document.getElementById('root') as HTMLElement
  if (el && !el.getAttribute('data-vx-app-mounted')) {
    preConfig(props)

    const root = ReactDOM.createRoot(el)
    root.render(<Provider {...props} />)
    el.setAttribute('data-vx-app-mounted', name || '')

    config(props)
  } else {
    useLogger.log(NAMESPACE, '[provider] | root el is missing')
  }
}

export { ClientDevtools, defineConfig, Provider }
