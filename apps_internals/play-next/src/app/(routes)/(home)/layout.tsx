'use client'

import type { ReactNode } from 'react'

import { Provider } from '@vx/start/next'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => (
  <Provider strict={false}>{children}</Provider>
)
