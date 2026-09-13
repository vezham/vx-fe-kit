import { createRootRoute } from '@tanstack/react-router'

import { defineConfig } from '@vx/start/tanstack'

import { tanstackHead, vxI18n } from '@generated/vx'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: () => defineConfig({ lang: vxI18n.defaultLanguage })
})
