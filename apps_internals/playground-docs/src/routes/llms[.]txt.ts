import { createFileRoute } from '@tanstack/react-router'

import { getDocsLLMSIndex } from '@vx/start/runtime/docs'

import { source } from '@src/lib/source'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET() {
        return new Response(getDocsLLMSIndex(source))
      }
    }
  }
})
