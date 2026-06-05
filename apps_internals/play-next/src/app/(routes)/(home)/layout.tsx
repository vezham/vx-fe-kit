'use client'

import type { ReactNode } from 'react'

import { Provider } from '@vx/start/vite'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => (
  <Provider strict={false}>{children}</Provider>
)
