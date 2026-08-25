import { Link, notFound } from '@tanstack/react-router'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import { DocsLayout as DocsShellLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover
} from 'fumadocs-ui/layouts/docs/page'
import { DocsLayout as NotebookLayout } from 'fumadocs-ui/layouts/notebook'
import {
  DocsBody as NotebookDocsBody,
  DocsDescription as NotebookDocsDescription,
  DocsPage as NotebookDocsPage,
  DocsTitle as NotebookDocsTitle
} from 'fumadocs-ui/layouts/notebook/page'
import type { ComponentProps } from 'react'
import { Suspense, use } from 'react'

import { vxMetadata } from '@generated/vx'
import { docs } from '@src/lib/docs'
import type { Locale } from '@src/lib/i18n'
import { i18n } from '@src/lib/i18n'
import { baseOptions } from '@src/lib/layout.shared'
import {
  appName,
  docsImageRoute,
  docsRoute,
  encodeMarkdownUrl
} from '@src/lib/shared'
import { preloadOpenAPIPage, source } from '@src/lib/source'

import { OpenAPIPage } from './api-page'
import { useMDXComponents } from './mdx'

type DocsShell = 'docs' | 'notebook'
type LoadedDocsPage = Awaited<ReturnType<typeof loadDocsPage>>
type OpenAPIPageComponentProps = ComponentProps<typeof OpenAPIPage>

export async function loadDocsPage(slugs: string[], lang: Locale) {
  const page = source.getPage(slugs, lang)

  if (!page) {
    throw notFound()
  }

  const pageTree = await source.serializePageTree(source.getPageTree(lang))

  return {
    lang,
    title: page.data.title,
    description: page.data.description,
    routePath: page.url,
    path: page.path,
    markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
    pageTree,
    openapiData: await preloadOpenAPIPage(page)
  }
}

export async function preloadDocsPage(data: LoadedDocsPage) {
  await docs.getPage(data.path)?.preload()
}

function absoluteSiteUrl(pathname: string) {
  return new URL(pathname, `${vxMetadata.url}/`).toString()
}

function normalizeDocsRoutePath(routePath: string) {
  for (const lang of i18n.languages) {
    const localizedDocsRoute = `/${lang}${docsRoute}`

    if (routePath === localizedDocsRoute) {
      return docsRoute
    }

    if (routePath.startsWith(`${localizedDocsRoute}/`)) {
      return routePath.slice(`/${lang}`.length)
    }
  }

  return routePath
}

function docsOgImagePath(routePath: string) {
  if ((vxMetadata.openGraph.imageSource as string) !== 'default') {
    return vxMetadata.openGraph.image
  }

  const docsPath = normalizeDocsRoutePath(routePath)
  const suffix = docsPath === docsRoute ? '' : docsPath.slice(docsRoute.length)

  return `${docsImageRoute}${suffix}/image.png`
}

export function getDocsRouteHead(data?: LoadedDocsPage) {
  if (!data) {
    return {}
  }

  const title = `${data.title} | ${appName}`
  const description = data.description ?? vxMetadata.description
  const docsPath = normalizeDocsRoutePath(data.routePath)
  const pageUrl =
    data.lang === i18n.defaultLanguage ? docsPath : `/${data.lang}${docsPath}`
  const imageUrl = docsOgImagePath(docsPath)

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:url', content: absoluteSiteUrl(pageUrl) },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:url', content: absoluteSiteUrl(pageUrl) },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  }
}

function Content({
  path,
  markdownUrl,
  openapiData,
  shell
}: {
  path: string
  markdownUrl: string
  openapiData: LoadedDocsPage['openapiData']
  shell: DocsShell
}) {
  const page = docs.getPage(path)

  if (!page) {
    throw new Error(`unknown page: ${path}`)
  }

  const { toc } = use(page.load())
  const MDX = page.body
  const Page = shell === 'notebook' ? NotebookDocsPage : DocsPage
  const Body = shell === 'notebook' ? NotebookDocsBody : DocsBody
  const Description =
    shell === 'notebook' ? NotebookDocsDescription : DocsDescription
  const Title = shell === 'notebook' ? NotebookDocsTitle : DocsTitle
  const components = useMDXComponents(
    openapiData
      ? {
          APIPage: props => (
            <OpenAPIPage
              {...({ ...openapiData, ...props } as OpenAPIPageComponentProps)}
            />
          ),
          OpenAPIPage: props => (
            <OpenAPIPage
              {...({ ...openapiData, ...props } as OpenAPIPageComponentProps)}
            />
          )
        }
      : undefined
  )

  if (openapiData) {
    return (
      <Page full toc={toc}>
        <MDX components={components} />
      </Page>
    )
  }

  return (
    <Page toc={toc}>
      <Title>{page.title}</Title>
      <Description>{page.description}</Description>
      <div className="-mt-4 flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} />
      </div>
      <Body>
        <MDX components={components} />
      </Body>
    </Page>
  )
}

export function DocsRoutePage({
  data,
  shell = 'docs'
}: {
  data: LoadedDocsPage
  shell?: DocsShell
}) {
  const page = useFumadocsLoader(data)
  const Layout = shell === 'notebook' ? NotebookLayout : DocsShellLayout
  const content = (
    <>
      <Link to={page.markdownUrl} hidden />
      <Suspense>
        <Content
          path={page.path}
          markdownUrl={page.markdownUrl}
          openapiData={page.openapiData}
          shell={shell}
        />
      </Suspense>
    </>
  )

  return (
    <Layout {...baseOptions(page.lang)} tree={page.pageTree}>
      {content}
    </Layout>
  )
}
