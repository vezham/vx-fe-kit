import type { ReactNode } from 'react'

import { defineConfig } from '@vx/start/next'

import './global.css'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => defineConfig({ children })

export const metadata = {
  title: 'Home | Vezham PlayNext',
  description: 'single app to manage your Vezham PlayNext'
}
