import type { I18nConfig } from 'fumadocs-core/i18n'
import { type SearchAPI, createFromSource } from 'fumadocs-core/search/server'
import { type StaticSource, llms, loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import type { OpenAPIOptions } from 'fumadocs-openapi/server'
import { createOpenAPI } from 'fumadocs-openapi/server'
import { parse } from 'yaml'

export const defaultDocsRoute = '/docs'
export const defaultDocsImageRoute = '/og/docs'

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
  lang: string
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

function slash(value: string) {
  return value.split('/').join('/')
}

export function encodeMarkdownUrl(
  slugs: string[],
  locale?: string,
  docsRoute = defaultDocsRoute
) {
  const segments = [...slugs]

  if (segments.length === 0) {
    segments.push('index.md')
  } else {
    segments[segments.length - 1] += '.md'
  }

  return (
    '/' +
    [locale, ...docsRoute.split('/'), ...segments].filter(Boolean).join('/')
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
      ? filePath
      : segments.slice(openapiDirIndex + 1).join('/')

  return relativePath.replace(/\.(?:json|yaml|yml)$/, '')
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
          [rootDocumentId]: parseOpenAPIDocument('openapi.yaml', rootDocument)
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

export function createDocsSearchServer(source: unknown): SearchAPI {
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
  if (openGraphImageSource !== 'default') {
    return openGraphImage
  }

  const docsPath = normalizeDocsRoutePath({ docsRoute, languages, routePath })
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
    data.lang === defaultLanguage ? docsPath : `/${data.lang}${docsPath}`
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
