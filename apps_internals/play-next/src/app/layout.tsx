import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { defineConfig } from '@vx/start/next'

import './global.css'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => defineConfig({ children })

export const metadata: Metadata = {
  title: 'Home | Vezham Play Next',
  description: 'single app to manage your Vezham Play Next'
}
