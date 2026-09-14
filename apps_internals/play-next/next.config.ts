import { composePlugins, withNx } from '@nx/next'
import type { WithNxOptions } from '@nx/next/plugins/with-nx'
import { join } from 'node:path'

import { configEnv } from '@vx/env/next'

const nextConfig: WithNxOptions = {
  // vx-bot/NOTE: Use this to set Nx-specific options
  // vx-bot/NOTE: See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  typescript: {
    tsconfigPath: 'tsconfig.app.json'
  },
  env: configEnv,
  turbopack: {
    root: join(__dirname, '../..')
  }
}

const plugins = [
  // vx-bot/NOTE: Add more Next.js plugins to this list if needed.
  withNx
]

export default composePlugins(...plugins)(nextConfig)
