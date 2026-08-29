import { type I18nConfig, defineI18n } from 'fumadocs-core/i18n'
import { type SearchAPI, createFromSource } from 'fumadocs-core/search/server'
import { type StaticSource, llms, loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import type { OpenAPIOptions } from 'fumadocs-openapi/server'
import { createOpenAPI } from 'fumadocs-openapi/server'
import { parse } from 'yaml'

export const defaultDocsRoute = '/docs'

export function getDocsImageRoute(docsRoute = defaultDocsRoute) {
  return `/og${docsRoute}`
}

export const defaultDocsImageRoute = getDocsImageRoute()

type OpenAPIDocument = Exclude<
  NonNullable<OpenAPIOptions['input']>,
  string[]
>[string]

type DocsOpenAPIPlugin = {
  loaderPlugin: () => ReturnType<
    ReturnType<typeof createOpenAPI>['loaderPlugin']
  >
}

type DocsOpenAPIRuntime = {
  getSchema: (documentId: string) => Promise<unknown>
}

type DocsOpenAPIPreloader = {
  preloadOpenAPIPage: (page: never) => Promise<unknown>
}

export type OpenAPISourceFiles = Record<string, string>

export type CreateOpenAPIFromSourcesOptions = {
  files?: OpenAPISourceFiles
  openapiDir?: string
  rootDocument?: string
  rootDocumentId?: string
}

export type DocsPageLike = {
  data: {
    _openapi?: {
      preload?: unknown
    }
    description?: string
    getText?: (mode: 'processed' | 'raw') => Promise<string>
    title?: string
  }
  locale?: string
  slugs?: string[]
  url: string
}

export type DocsRouteHeadData = {
  description?: string
  locale: string
  routePath: string
  title: string
}

export type DocsRouteHeadOptions = {
  appName: string
  defaultLanguage: string
  docsImageRoute?: string
  docsRoute?: string
  languages: readonly string[]
  openGraphImage: string
  openGraphImageSource?: string
  siteDescription: string
  siteUrl: string
}

export type DocsI18nInput<Languages extends readonly string[]> = {
  defaultLanguage: Languages[number]
  hideLocale?: I18nConfig<Languages[number]>['hideLocale']
  languages: Languages
}

function slash(value: string) {
  return value.split('\\').join('/')
}

export function encodeMarkdownUrl(
  slugs: string[],
  locale?: string,
  docsRoute = defaultDocsRoute,
  defaultLocale?: string
) {
  const segments = [...slugs]
  const localePrefix = locale && locale !== defaultLocale ? locale : undefined

  if (segments.length === 0) {
    segments.push('index.md')
  } else {
    segments[segments.length - 1] += '.md'
  }

  return (
    '/' +
    [localePrefix, ...docsRoute.split('/'), ...segments]
      .filter(Boolean)
      .join('/')
  )
}

export function decodeMarkdownUrl(segments: string[]) {
  if (segments.length === 0) {
    return []
  }

  const out = [...segments]
  out[out.length - 1] = out[out.length - 1].replace(/\.md$/, '')

  if (out.length === 1 && out[0] === 'index') {
    out.pop()
  }

  return out
}

export function parseOpenAPIDocument(
  filePath: string,
  source: string
): OpenAPIDocument {
  return (
    filePath.endsWith('.json') ? JSON.parse(source) : parse(source)
  ) as OpenAPIDocument
}

export function openAPIDocumentIdFromPath(
  filePath: string,
  openapiDir = 'openapi'
) {
  const segments = slash(filePath).split('/')
  const openapiDirIndex = segments.lastIndexOf(openapiDir)
  const relativePath =
    openapiDirIndex === -1
      ? slash(filePath)
      : segments.slice(openapiDirIndex + 1).join('/')

  const idSegments = relativePath.replace(/\.(?:json|yaml|yml)$/, '').split('/')

  if (idSegments[idSegments.length - 1] === 'index') {
    idSegments.pop()
  }

  return idSegments.length === 0 ? 'openapi' : idSegments.join('/')
}

export function createOpenAPIFromSources({
  files = {},
  openapiDir,
  rootDocument,
  rootDocumentId = 'openapi'
}: CreateOpenAPIFromSourcesOptions) {
  const input = {
    ...(rootDocument
      ? {
          [rootDocumentId]: parseOpenAPIDocument(
            'openapi/index.yaml',
            rootDocument
          )
        }
      : {}),
    ...Object.fromEntries(
      Object.entries(files).map(([filePath, source]) => [
        openAPIDocumentIdFromPath(filePath, openapiDir),
        parseOpenAPIDocument(filePath, source)
      ])
    )
  }

  return createOpenAPI({ input })
}

export function createDocsI18n<const Languages extends readonly string[]>(
  config: DocsI18nInput<Languages>
) {
  const { hideLocale = 'default-locale', languages, ...i18nConfig } = config

  return defineI18n({
    ...i18nConfig,
    hideLocale,
    languages: [...languages]
  })
}

export function normalizeLocale<Locale extends string>(
  i18n: {
    defaultLanguage: Locale
    languages: readonly Locale[]
  },
  lang?: string
): Locale {
  return i18n.languages.includes(lang as Locale)
    ? (lang as Locale)
    : i18n.defaultLanguage
}

export function isOptionalLocaleParam<Locale extends string>(
  i18n: {
    languages: readonly Locale[]
  },
  lang?: string
): lang is Locale | undefined {
  return !lang || i18n.languages.includes(lang as Locale)
}

export function isDefaultLocaleParam<Locale extends string>(
  i18n: {
    defaultLanguage: Locale
  },
  lang?: string
): lang is Locale {
  return lang === i18n.defaultLanguage
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function getDefaultLocaleRedirectHref<Locale extends string>(
  i18n: {
    defaultLanguage: Locale
  },
  href: string
) {
  const defaultLocalePattern = escapeRegExp(i18n.defaultLanguage)
  const defaultLocalePrefix = new RegExp(
    `^/${defaultLocalePattern}(?=/|\\?|#|$)`
  )

  if (!defaultLocalePrefix.test(href)) {
    return
  }

  return href.replace(defaultLocalePrefix, '') || '/'
}

export function localizedUrl<Locale extends string>(
  i18n: {
    defaultLanguage: Locale
  },
  locale: Locale,
  path: string
) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return locale === i18n.defaultLanguage
    ? normalizedPath
    : `/${locale}${normalizedPath}`
}

export function localizedRouteParam<Locale extends string>(
  i18n: {
    defaultLanguage: Locale
  },
  locale?: Locale
) {
  return locale && locale !== i18n.defaultLanguage ? locale : undefined
}

export function localizeRouteBase<Locale extends string>({
  defaultLanguage,
  lang,
  languages,
  routeBase
}: {
  defaultLanguage?: Locale
  lang?: string
  languages: readonly Locale[]
  routeBase: string
}) {
  const locale = languages.find(language => language === lang)

  return locale && locale !== defaultLanguage
    ? `/${locale}${routeBase}`
    : routeBase
}

export function replaceDocsRouteBase({
  docsRoute = defaultDocsRoute,
  languages,
  pagePath,
  routeBase
}: {
  docsRoute?: string
  languages: readonly string[]
  pagePath: string
  routeBase: string
}) {
  if (routeBase === docsRoute) {
    return pagePath
  }

  if (pagePath === docsRoute) {
    return routeBase
  }

  if (pagePath.startsWith(`${docsRoute}/`)) {
    return `${routeBase}${pagePath.slice(docsRoute.length)}`
  }

  for (const lang of languages) {
    const localizedDocsRoute = `/${lang}${docsRoute}`

    if (pagePath === localizedDocsRoute) {
      return routeBase
    }

    if (pagePath.startsWith(`${localizedDocsRoute}/`)) {
      return `${routeBase}${pagePath.slice(localizedDocsRoute.length)}`
    }
  }

  return pagePath
}

export function createDocsSource<
  Docs extends StaticSource,
  I18n extends I18nConfig
>({
  docs,
  docsRoute = defaultDocsRoute,
  i18n,
  openapi
}: {
  docs: Docs
  docsRoute?: string
  i18n: I18n
  openapi: DocsOpenAPIPlugin
}) {
  return loader(
    {
      docs
    },
    {
      baseUrl: docsRoute,
      i18n,
      plugins: [lucideIconsPlugin(), openapi.loaderPlugin()]
    }
  )
}

export function createDocsRuntime<
  Docs extends StaticSource,
  I18n extends I18nConfig
>({
  docs,
  docsRoute,
  i18n,
  openapi
}: {
  docs: Docs
  docsRoute?: string
  i18n: I18n
  openapi: DocsOpenAPIPlugin & DocsOpenAPIRuntime & DocsOpenAPIPreloader
}) {
  const source = createDocsSource({ docs, docsRoute, i18n, openapi })

  return {
    source,
    preloadOpenAPIPage: (page: (typeof source)['$inferPage']) =>
      getOpenAPIDocumentId(page)
        ? openapi.preloadOpenAPIPage(page as never)
        : undefined,
    getLLMText: (page: (typeof source)['$inferPage']) =>
      getDocsLLMText(page, openapi)
  }
}

export function getOpenAPIDocumentId(page: DocsPageLike) {
  const preload = page.data._openapi?.preload

  return Array.isArray(preload) && typeof preload[0] === 'string'
    ? preload[0]
    : undefined
}

export async function preloadDocsOpenAPIPage<Page extends DocsPageLike>(
  page: Page,
  openapi: {
    preloadOpenAPIPage: (page: Page) => Promise<unknown>
  }
) {
  return getOpenAPIDocumentId(page)
    ? openapi.preloadOpenAPIPage(page)
    : undefined
}

export async function getDocsLLMText(
  page: DocsPageLike,
  openapi?: Pick<DocsOpenAPIRuntime, 'getSchema'>
) {
  const documentId = getOpenAPIDocumentId(page)

  if (documentId && openapi) {
    return JSON.stringify(await openapi.getSchema(documentId), null, 2)
  }

  if (!page.data.getText) {
    throw new Error(`Cannot render LLM text for ${page.url}`)
  }

  const processed = await page.data.getText('processed')

  return `# ${page.data.title ?? 'Untitled'} (${page.url})

${processed}`
}

export function getDocsLLMSIndex(source: unknown) {
  return llms(source as Parameters<typeof llms>[0]).index()
}

export function createSearchServer(source: unknown): SearchAPI {
  return createFromSource(source as Parameters<typeof createFromSource>[0])
}

export function normalizeDocsRoutePath({
  docsRoute = defaultDocsRoute,
  languages,
  routePath
}: {
  docsRoute?: string
  languages: readonly string[]
  routePath: string
}) {
  for (const lang of languages) {
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

export function getDocsOgImagePath({
  docsImageRoute = defaultDocsImageRoute,
  docsRoute = defaultDocsRoute,
  languages,
  openGraphImage,
  openGraphImageSource,
  routePath
}: {
  docsImageRoute?: string
  docsRoute?: string
  languages: readonly string[]
  openGraphImage: string
  openGraphImageSource?: string
  routePath: string
}) {
  const usesDefaultOgImage =
    openGraphImageSource === 'default' || openGraphImage === '/og/image.png'

  if (!usesDefaultOgImage) {
    return openGraphImage
  }

  const docsPath = normalizeDocsRoutePath({ docsRoute, languages, routePath })
  const docsImageRouteRoot = docsImageRoute.split('/').slice(0, -1).join('/')

  if (docsPath !== docsRoute && !docsPath.startsWith(`${docsRoute}/`)) {
    return `${docsImageRouteRoot}${docsPath}/image.png`
  }

  const suffix = docsPath === docsRoute ? '' : docsPath.slice(docsRoute.length)

  return `${docsImageRoute}${suffix}/image.png`
}

function absoluteSiteUrl(pathname: string, siteUrl: string) {
  return new URL(pathname, `${siteUrl}/`).toString()
}

export function getDocsRouteHead(
  data: DocsRouteHeadData | undefined,
  {
    appName,
    defaultLanguage,
    docsImageRoute,
    docsRoute = defaultDocsRoute,
    languages,
    openGraphImage,
    openGraphImageSource,
    siteDescription,
    siteUrl
  }: DocsRouteHeadOptions
) {
  if (!data) {
    return {}
  }

  const title = `${data.title} | ${appName}`
  const description = data.description ?? siteDescription
  const docsPath = normalizeDocsRoutePath({
    docsRoute,
    languages,
    routePath: data.routePath
  })
  const pageUrl =
    data.locale === defaultLanguage ? docsPath : `/${data.locale}${docsPath}`
  const imageUrl = getDocsOgImagePath({
    docsImageRoute,
    docsRoute,
    languages,
    openGraphImage,
    openGraphImageSource,
    routePath: docsPath
  })

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:url', content: absoluteSiteUrl(pageUrl, siteUrl) },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:url', content: absoluteSiteUrl(pageUrl, siteUrl) },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  }
}
