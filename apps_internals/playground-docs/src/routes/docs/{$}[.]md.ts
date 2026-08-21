import { createFileRoute, notFound } from '@tanstack/react-router'

import { decodeMarkdownUrl } from '@src/lib/shared'
import { getLLMText, source } from '@src/lib/source'

export const Route = createFileRoute('/docs/{$}.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugs = decodeMarkdownUrl(params._splat?.split('/') ?? [])
        const page = source.getPage(slugs)

        if (!page) {
          throw notFound()
        }

        return new Response(await getLLMText(page), {
          headers: {
            'Content-Type': 'text/markdown'
          }
        })
      }
    }
  }
})
