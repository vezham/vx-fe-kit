import { tanstackHead } from '@generated/vx'
import { createRootRoute } from '@tanstack/react-router'

import { defineConfig } from '@vx/start/tanstack'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: defineConfig
})
