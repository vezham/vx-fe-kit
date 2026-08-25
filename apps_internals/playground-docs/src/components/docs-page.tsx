import { Link, notFound } from '@tanstack/react-router'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import type { ComponentProps } from 'react'
import { Suspense, use } from 'react'

import { DocsLayout, DocsPage, type DocsShell } from '@vx/start/layouts/docs'
import { OpenAPIPage } from '@vx/start/pages/docs/openapi'
import { getDocsRouteHead as getStartDocsRouteHead } from '@vx/start/runtime/docs'

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

import { useMDXComponents } from './mdx'

type LoadedDocsPage = Awaited<ReturnType<typeof loadDocsPage>>
type OpenAPIPageComponentProps = ComponentProps<typeof OpenAPIPage>

function replaceDocsRoute(pagePath: string, nextRoute: string) {
  if (nextRoute === docsRoute) {
    return pagePath
  }

  if (pagePath === docsRoute) {
    return nextRoute
  }

  if (pagePath.startsWith(`${docsRoute}/`)) {
    return `${nextRoute}${pagePath.slice(docsRoute.length)}`
  }

  for (const lang of i18n.languages) {
    const localizedDocsRoute = `/${lang}${docsRoute}`

    if (pagePath === localizedDocsRoute) {
      return nextRoute
    }

    if (pagePath.startsWith(`${localizedDocsRoute}/`)) {
      return `${nextRoute}${pagePath.slice(localizedDocsRoute.length)}`
    }
  }

  return pagePath
}

export async function loadDocsPage(
  slugs: string[],
  lang: Locale,
  routeRoot = docsRoute
) {
  const page = source.getPage(slugs, lang)

  if (!page) {
    throw notFound()
  }

  const pageTree = await source.serializePageTree(source.getPageTree(lang))

  return {
    lang,
    title: page.data.title,
    description: page.data.description,
    routePath: replaceDocsRoute(page.url, routeRoot),
    path: page.path,
    markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
    pageTree,
    openapiData: await preloadOpenAPIPage(page)
  }
}

export async function preloadDocsPage(data: LoadedDocsPage) {
  await docs.getPage(data.path)?.preload()
}

export function getDocsRouteHead(data?: LoadedDocsPage) {
  return getStartDocsRouteHead(data, {
    appName,
    defaultLanguage: i18n.defaultLanguage,
    docsImageRoute,
    docsRoute,
    languages: i18n.languages,
    openGraphImage: vxMetadata.openGraph.image,
    openGraphImageSource: vxMetadata.openGraph.imageSource,
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  })
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
      <DocsPage full shell={shell} toc={toc}>
        <MDX components={components} />
      </DocsPage>
    )
  }

  return (
    <DocsPage
      description={page.description}
      markdownUrl={markdownUrl}
      shell={shell}
      title={page.title}
      toc={toc}>
      <MDX components={components} />
    </DocsPage>
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
    <DocsLayout {...baseOptions(page.lang)} shell={shell} tree={page.pageTree}>
      {content}
    </DocsLayout>
  )
}
