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
import type { ReactNode } from 'react'

import { OpenAPIPage } from '@src/components/api-page'
import { useMDXComponents } from '@src/components/mdx'
import { baseOptions } from '@src/lib/layout.shared'
import { encodeMarkdownUrl, gitConfig } from '@src/lib/shared'
import { docs, source } from '@src/lib/source'

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? []
    const data = await loadPage(slugs)

    if (data.type === 'docs') {
      await docs.getPage(data.path)?.preload()
    }

    return data
  }
})

async function loadPage(slugs: string[]) {
  const page = source.getPage(slugs, 'en')

  if (!page) {
    throw notFound()
  }

  const pageTree = await source.serializePageTree(source.getPageTree('en'))

  if (page.type === 'openapi') {
    return {
      type: 'openapi' as const,
      title: page.data.title,
      description: page.data.description,
      pageTree,
      props: page.data.getOpenAPIPageProps()
    }
  }

  return {
    type: 'docs' as const,
    path: page.path,
    markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
    pageTree
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
  const page = useFumadocsLoader(Route.useLoaderData())
  let content: ReactNode

  if (page.type === 'openapi') {
    content = (
      <DocsPage full>
        <DocsTitle>{page.title}</DocsTitle>
        <DocsDescription>{page.description}</DocsDescription>
        <OpenAPIPage {...page.props} />
      </DocsPage>
    )
  } else {
    content = (
      <>
        <Link to={page.markdownUrl} hidden />
        <Suspense>
          <Content path={page.path} markdownUrl={page.markdownUrl} />
        </Suspense>
      </>
    )
  }

  return (
    <DocsLayout {...baseOptions()} tree={page.pageTree}>
      {content}
    </DocsLayout>
  )
}
