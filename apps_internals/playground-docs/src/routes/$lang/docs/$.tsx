import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover
} from 'fumadocs-ui/layouts/docs/page'
import { Suspense, use } from 'react'

import { useMDXComponents } from '@src/components/mdx'
import { type Locale, resolveLocale } from '@src/lib/i18n'
import { baseOptions } from '@src/lib/layout.shared'
import { encodeMarkdownUrl, gitConfig } from '@src/lib/shared'
import { docs, source } from '@src/lib/source'

export const Route = createFileRoute('/$lang/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const lang = resolveLocale(params.lang)
    const slugs = params._splat?.split('/') ?? []
    const data = await loadPage(slugs, lang)

    await docs.getPage(data.path)?.preload()

    return data
  }
})

async function loadPage(slugs: string[], lang: Locale) {
  const page = source.getPage(slugs, lang)

  if (!page) {
    throw notFound()
  }

  return {
    lang,
    path: page.path,
    markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
    pageTree: await source.serializePageTree(source.getPageTree(lang))
  }
}

function Content({ path, markdownUrl }: { path: string; markdownUrl: string }) {
  const page = docs.getPage(path)

  if (!page) {
    throw new Error(`unknown page: ${path}`)
  }

  const { toc } = use(page.load())
  const MDX = page.body

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <div className="-mt-4 flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/apps_internals/playground-docs/content/docs/${path}`}
        />
      </div>
      <DocsBody>
        <MDX components={useMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

function Page() {
  const { pageTree, path, markdownUrl, lang } = useFumadocsLoader(
    Route.useLoaderData()
  )

  return (
    <DocsLayout {...baseOptions(lang)} tree={pageTree}>
      <Link to={markdownUrl} hidden />
      <Suspense>
        <Content path={path} markdownUrl={markdownUrl} />
      </Suspense>
    </DocsLayout>
  )
}
