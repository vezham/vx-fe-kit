import { createFileRoute, notFound } from '@tanstack/react-router'

import { resolveLocale } from '@src/lib/i18n'
import { decodeMarkdownUrl } from '@src/lib/shared'
import { getLLMText, source } from '@src/lib/source'

export const Route = createFileRoute('/{-$lang}/docs/{$}.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const lang = resolveLocale(params.lang)
        const slugs = decodeMarkdownUrl(params._splat?.split('/') ?? [])
        const page = source.getPage(slugs, lang)

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
