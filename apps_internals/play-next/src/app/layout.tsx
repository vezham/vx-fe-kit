import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { defineConfig } from '@vx/start/next'

import { nextMetadata, nextViewport } from '@generated/vx'

import './global.css'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => defineConfig({ children })

export const metadata: Metadata = {
  ...nextMetadata,
  metadataBase: new URL(nextMetadata.metadataBase)
}

export const viewport: Viewport = nextViewport
