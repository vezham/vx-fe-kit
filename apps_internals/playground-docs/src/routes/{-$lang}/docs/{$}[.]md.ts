import { createFileRoute } from '@tanstack/react-router'

import { getLLMText } from '@app/docs'
import { getDocsPage } from '@app/docs-page'

export const Route = createFileRoute('/{-$lang}/docs/{$}.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { page } = getDocsPage({
          slugs: params._splat?.split('/') ?? [],
          lang: params.lang,
          pathFormat: 'markdown-url'
        })

        return new Response(await getLLMText(page), {
          headers: {
            'Content-Type': 'text/markdown'
          }
        })
      }
    }
  }
})
