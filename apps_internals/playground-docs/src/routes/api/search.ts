import { createFileRoute } from '@tanstack/react-router'

import { createDocsSearchServer } from '@vx/start/runtime/docs'

import { source } from '@src/lib/source'

const server = createDocsSearchServer(source)

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      GET: async () => server.staticGET()
    }
  }
})
