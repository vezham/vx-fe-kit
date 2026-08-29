import { notFound } from '@tanstack/react-router'

import {
  decodeMarkdownUrl,
  encodeMarkdownUrl,
  getDocsRouteHead as getStartDocsRouteHead,
  localizeRouteBase,
  normalizeLocale,
  replaceDocsRouteBase
} from '@vx/start/runtime/docs'

import { docs, i18n, preloadOpenAPIPage, source } from '@app/docs'
import { vxCore, vxDocs, vxMetadata } from '@generated/vx'

export type LoadedDocsPage = Awaited<ReturnType<typeof loadDocsPage>>

type DocsPageInput = {
  lang?: string
  pathFormat?: 'slug' | 'markdown-url'
  slugs: string[]
}

export function getDocsPage({ lang, pathFormat, slugs }: DocsPageInput) {
  const resolvedSlugs =
    pathFormat === 'markdown-url' ? decodeMarkdownUrl(slugs) : slugs
  const locale = normalizeLocale(i18n, lang)
  const page = source.getPage(resolvedSlugs, locale)

  if (!page) {
    throw notFound()
  }

  return { locale, page }
}

export async function loadDocsPage({
  slugs,
  lang,
  routeBase = vxDocs.docsRoute
}: {
  slugs: string[]
  lang?: string
  routeBase?: string
}) {
  const { locale, page } = getDocsPage({ slugs, lang })
  const resolvedRouteBase = localizeRouteBase({
    lang,
    languages: i18n.languages,
    routeBase
  })

  const pageTree = await source.serializePageTree(source.getPageTree(locale))

  const data = {
    locale,
    title: page.data.title,
    description: page.data.description,
    routePath: replaceDocsRouteBase({
      docsRoute: vxDocs.docsRoute,
      languages: i18n.languages,
      pagePath: page.url,
      routeBase: resolvedRouteBase
    }),
    path: page.path,
    markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
    pageTree,
    openapiData: await preloadOpenAPIPage(page)
  }

  await docs.getPage(data.path)?.preload()

  return data
}

export function getDocsRouteHead(data?: LoadedDocsPage) {
  return getStartDocsRouteHead(data, {
    appName: vxCore.shortName,
    defaultLanguage: i18n.defaultLanguage,
    docsImageRoute: vxDocs.docsImageRoute,
    docsRoute: vxDocs.docsRoute,
    languages: i18n.languages,
    openGraphImage: vxMetadata.openGraph.image,
    openGraphImageSource: vxMetadata.openGraph.imageSource,
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  })
}
