/* eslint-disable @typescript-eslint/no-empty-object-type */
import { AxiosRequestConfig } from 'axios'
import { ReactNode } from 'react'

// import { Vmode } from '@vezham/theme'

interface AxiosProps {
  onRequest?: (config: AxiosRequestConfig) => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => {}
}

interface Props extends AxiosProps {
  id?: string
  className?: string
  children?: ReactNode
  classTarget?: string
  disableAnimation?: boolean
  // vmode?: Vmode
  strict?: boolean
  name?: string // wjdlz/NOTE: default V_APP_NAME
  version?: string
  query?: boolean
  store?: boolean
  worker?: boolean
  axios?: boolean
}

export type { Props }
