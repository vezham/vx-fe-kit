import { notFound } from '@tanstack/react-router'

import {
  decodeMarkdownUrl,
  encodeMarkdownUrl,
  getDocsRouteHead as getStartDocsRouteHead,
  normalizeLocale
} from '@vx/start/runtime/docs'

import { docs, i18n, preloadOpenAPIPage, source } from '@app/docs'
import { vxCore, vxDocs, vxMetadata } from '@generated/vx'

export type LoadedDocsPage = Awaited<ReturnType<typeof loadDocsPage>>

type DocsPageInput = {
  lang?: string
  pathFormat?: 'slug' | 'markdown-url'
  slugs: string[]
}

function replaceDocsRoute(pagePath: string, routeBase: string) {
  if (routeBase === vxDocs.docsRoute) {
    return pagePath
  }

  if (pagePath === vxDocs.docsRoute) {
    return routeBase
  }

  if (pagePath.startsWith(`${vxDocs.docsRoute}/`)) {
    return `${routeBase}${pagePath.slice(vxDocs.docsRoute.length)}`
  }

  for (const lang of i18n.languages) {
    const localizedDocsRoute = `/${lang}${vxDocs.docsRoute}`

    if (pagePath === localizedDocsRoute) {
      return routeBase
    }

    if (pagePath.startsWith(`${localizedDocsRoute}/`)) {
      return `${routeBase}${pagePath.slice(localizedDocsRoute.length)}`
    }
  }

  return pagePath
}

function withLocalePrefix(routeBase: string, lang?: string) {
  const locale = i18n.languages.find(language => language === lang)

  return locale ? `/${locale}${routeBase}` : routeBase
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
  const resolvedRouteBase = withLocalePrefix(routeBase, lang)

  const pageTree = await source.serializePageTree(source.getPageTree(locale))

  const data = {
    locale,
    title: page.data.title,
    description: page.data.description,
    routePath: replaceDocsRoute(page.url, resolvedRouteBase),
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
