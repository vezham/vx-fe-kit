import { createRootRoute } from '@tanstack/react-router'

import { defineConfig } from '@vx/start/tanstack-docs'

import { tanstackHead } from '@generated/vx'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: defineConfig
})
