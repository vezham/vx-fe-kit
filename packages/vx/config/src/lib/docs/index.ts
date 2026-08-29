import * as OpenAPI from 'fumadocs-openapi'
import { createOpenAPI } from 'fumadocs-openapi/server'
import { generateOGImage } from 'fumadocs-ui/og'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

export type DocsConfig = {
  docsRoute?: string
}

export type I18nConfig = {
  defaultLanguage: string
  languages: string[]
}

export type VxDocsConfig = {
  docs?: DocsConfig
  i18n?: I18nConfig
  routes?: RouteInput[]
}

type OpenAPISpec = {
  documentId: string
  inputPath: string
  outputDir: string
}

type DocsOgMeta = {
  description: string
  routePath: string
  title: string
}

export type DocsStaticPaths = {
  defaultDocsStaticPaths: string[]
  docsShellStaticPaths: string[]
  docsStaticPathsByLocale: Record<string, string[]>
  openApiStaticPaths: string[]
}

export type DocsPrerenderPage = {
  path: string
  prerender?: {
    outputPath: string
  }
}

export type RouteOg =
  | boolean
  | {
      image?: string
    }

export type RouteConfig = {
  og?: RouteOg
  path: string
  prerender?:
    | boolean
    | {
        outputPath?: string
      }
  source?: 'docs' | 'routes'
}

export type RouteInput = RouteConfig | string

export type DocsPrerenderPagesOptions = {
  extraPages?: Array<DocsPrerenderPage | string>
  includeDocsRoot?: boolean
  includeLocalizedDocsRoots?: boolean
  routes?: RouteInput[]
}

const defaultContentDir = 'content/docs'
const defaultDocsRoute = '/docs'
const defaultOpenApiDir = 'openapi'
const openapiExtensions = new Set(['.json', '.yaml', '.yml'])
const routeFileExtensions = new Set(['.js', '.jsx', '.ts', '.tsx'])

function docsImageRoute(docsRoute: string) {
  return `/og${docsRoute}`
}

export function resolveDocsConfig(config: DocsConfig = {}) {
  const docsRoute = config.docsRoute ?? defaultDocsRoute

  return {
    docsDir: defaultContentDir,
    docsRoute,
    docsImageRoute: docsImageRoute(docsRoute),
    openapiDir: defaultOpenApiDir,
    ogOutputDir: `public${docsImageRoute(docsRoute)}`
  }
}

function unique<T>(values: T[]) {
  return [...new Set(values)]
}

function uniqueByRoute(entries: DocsOgMeta[]) {
  const mapped = new Map<string, DocsOgMeta>()

  for (const entry of entries) {
    mapped.set(entry.routePath, entry)
  }

  return [...mapped.values()]
}

function slash(value: string) {
  return value.split(path.sep).join('/')
}

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(dir, entry.name)

    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath]
  })
}

function generatedDirectories(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (!entry.isDirectory()) {
      return []
    }

    const entryPath = path.join(dir, entry.name)

    return entry.name === '(generated)'
      ? [entryPath]
      : generatedDirectories(entryPath)
  })
}

function withoutExtension(filePath: string) {
  return filePath.slice(0, -path.extname(filePath).length)
}

function openAPISpecIdFromRelativePath(relativePath: string) {
  const relativeWithoutExtension = withoutExtension(slash(relativePath))
  const segments = relativeWithoutExtension.split('/')

  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }

  return segments.length === 0 ? 'openapi' : segments.join('/')
}

function getLocalizedMdxSuffixes(i18n: I18nConfig) {
  return getNonDefaultLanguages(i18n).map(lang => ({
    lang,
    suffix: `.${lang}.mdx`
  }))
}

function getNonDefaultLanguages(i18n: I18nConfig) {
  return i18n.languages.filter(lang => lang !== i18n.defaultLanguage)
}

function docsPathFromMdx(
  docsDir: string,
  docsRoute: string,
  i18n: I18nConfig,
  filePath: string
) {
  const relativePath = slash(path.relative(docsDir, filePath))

  if (!relativePath.endsWith('.mdx')) {
    return
  }

  const localizedSuffix = getLocalizedMdxSuffixes(i18n).find(({ suffix }) =>
    relativePath.endsWith(suffix)
  )
  const locale = localizedSuffix?.lang ?? i18n.defaultLanguage
  const withoutMdx = localizedSuffix
    ? relativePath.slice(0, -localizedSuffix.suffix.length)
    : relativePath.slice(0, -'.mdx'.length)
  const segments = withoutMdx
    .split('/')
    .filter(segment => !(segment.startsWith('(') && segment.endsWith(')')))

  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }

  const routePath = segments.length
    ? `${docsRoute}/${segments.join('/')}`
    : docsRoute
  const markdownPath = segments.length
    ? `${docsRoute}/${segments.join('/')}.md`
    : `${docsRoute}/index.md`

  return { locale, markdownPath, routePath }
}

function getDocsStaticPathsForLocale(
  docsDir: string,
  docsRoute: string,
  i18n: I18nConfig,
  locale: string
) {
  return unique(
    walkFiles(docsDir)
      .map(filePath => docsPathFromMdx(docsDir, docsRoute, i18n, filePath))
      .filter(entry => entry?.locale === locale)
      .flatMap(entry => (entry ? [entry.routePath, entry.markdownPath] : []))
  )
}

export function getDocsStaticPaths(
  projectRoot: string,
  config: DocsConfig = {},
  i18n: I18nConfig
): DocsStaticPaths {
  const resolved = resolveDocsConfig(config)
  const docsDir = path.resolve(projectRoot, resolved.docsDir)
  const defaultDocsStaticPaths = getDocsStaticPathsForLocale(
    docsDir,
    resolved.docsRoute,
    i18n,
    i18n.defaultLanguage
  )
  const openApiStaticPaths = defaultDocsStaticPaths.filter(pagePath =>
    pagePath.startsWith(`${resolved.docsRoute}/openapi/`)
  )
  const docsShellStaticPaths = defaultDocsStaticPaths.filter(
    pagePath => !pagePath.endsWith('.md')
  )
  const docsStaticPathsByLocale = Object.fromEntries(
    i18n.languages.map(lang => [
      lang,
      unique([
        ...getDocsStaticPathsForLocale(docsDir, resolved.docsRoute, i18n, lang),
        ...openApiStaticPaths
      ])
    ])
  )

  return {
    defaultDocsStaticPaths,
    docsShellStaticPaths,
    docsStaticPathsByLocale,
    openApiStaticPaths
  }
}

function shouldWritePrerenderIndex(pagePath: string) {
  return path.extname(pagePath) === '' && !pagePath.startsWith('/api/')
}

function isDocsShellPath(pagePath: string) {
  return !pagePath.endsWith('.md')
}

function createDocsPrerenderPage(pagePath: string): DocsPrerenderPage {
  return {
    path: pagePath,
    prerender: shouldWritePrerenderIndex(pagePath)
      ? {
          outputPath: `${pagePath}/index.html`
        }
      : undefined
  }
}

function normalizeDocsPrerenderPage(
  page: DocsPrerenderPage | string
): DocsPrerenderPage {
  return typeof page === 'string' ? createDocsPrerenderPage(page) : page
}

function replaceDocsRoute(
  pagePath: string,
  docsRoute: string,
  nextRoute: string
) {
  if (pagePath === docsRoute) {
    return nextRoute
  }

  return pagePath.startsWith(`${docsRoute}/`)
    ? `${nextRoute}${pagePath.slice(docsRoute.length)}`
    : pagePath
}

function routeRootFromGlob(pagePath: string) {
  const globSuffix = '/**'

  return pagePath.endsWith(globSuffix)
    ? pagePath.slice(0, -globSuffix.length)
    : undefined
}

function normalizeRoute(route: RouteInput): RouteConfig {
  return typeof route === 'string' ? { path: route } : route
}

function shouldPrerenderRoute(route: RouteConfig) {
  return route.prerender !== false
}

function docsMirrorRouteFromRoute(route: RouteConfig) {
  const routeRoot = routeRootFromGlob(route.path)

  return routeRoot && route.source === 'docs' ? routeRoot : undefined
}

function decodeRouteSegment(segment: string) {
  return segment.split('[.]').join('.')
}

function isPathlessRouteSegment(segment: string) {
  return segment.startsWith('(') && segment.endsWith(')')
}

function isDynamicRouteSegment(segment: string) {
  return segment === '$' || segment.includes('$') || segment.includes('{')
}

function routePathFromFile(routesDir: string, filePath: string) {
  const extension = path.extname(filePath)

  if (!routeFileExtensions.has(extension)) {
    return
  }

  const relativePath = slash(path.relative(routesDir, filePath))
  const segments = withoutExtension(relativePath)
    .split('/')
    .filter(segment => segment !== '__root__')

  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }

  if (segments[segments.length - 1] === 'route') {
    segments.pop()
  }

  const routeSegments = segments
    .filter(segment => !isPathlessRouteSegment(segment))
    .map(decodeRouteSegment)

  if (routeSegments.length === 0 || routeSegments.some(isDynamicRouteSegment)) {
    return
  }

  return `/${routeSegments.join('/')}`
}

function getStaticFilesystemRoutes(projectRoot: string, routeRoot: string) {
  const routesDir = path.join(projectRoot, 'src/routes')

  return unique(
    walkFiles(routesDir)
      .map(filePath => routePathFromFile(routesDir, filePath))
      .filter(routePath => routePath !== undefined)
      .filter(
        routePath =>
          routePath === routeRoot || routePath.startsWith(`${routeRoot}/`)
      )
      .sort((left, right) => left.localeCompare(right))
  )
}

function createFilesystemRoutePrerenderPages(
  projectRoot: string,
  route: RouteConfig
) {
  const routeRoot = routeRootFromGlob(route.path)

  if (!routeRoot || route.source !== 'routes') {
    return []
  }

  if (typeof route.prerender === 'object' && route.prerender.outputPath) {
    throw new Error(
      `Unsupported prerender outputPath for filesystem route glob "${route.path}". Use exact paths for custom output paths.`
    )
  }

  return getStaticFilesystemRoutes(projectRoot, routeRoot).map(pagePath =>
    createDocsPrerenderPageFromRoute({ ...route, path: pagePath })
  )
}

function shouldGenerateDocsRouteOg(route: RouteConfig) {
  const hasDocsMirrorGlob = docsMirrorRouteFromRoute(route) !== undefined

  if (typeof route.og === 'object') {
    return false
  }

  return route.og ?? hasDocsMirrorGlob
}

function assertSupportedRoute(route: RouteConfig) {
  const routeRoot = routeRootFromGlob(route.path)

  if (!routeRoot || route.source === 'docs' || route.source === 'routes') {
    return
  }

  throw new Error(
    `Unsupported route source "${route.source ?? 'none'}" for glob route "${route.path}". Use source "docs", source "routes", or provide an exact path.`
  )
}

function createDocsPrerenderPageFromRoute(
  route: RouteConfig
): DocsPrerenderPage {
  if (typeof route.prerender === 'object' && route.prerender.outputPath) {
    return {
      path: route.path,
      prerender: {
        outputPath: route.prerender.outputPath
      }
    }
  }

  return createDocsPrerenderPage(route.path)
}

function getDocsMirrorRoutes(routes: RouteInput[]) {
  return unique(
    routes
      .map(normalizeRoute)
      .filter(shouldGenerateDocsRouteOg)
      .map(docsMirrorRouteFromRoute)
      .filter(route => route !== undefined)
  )
}

function uniquePrerenderPages(pages: DocsPrerenderPage[]) {
  return [...new Map(pages.map(page => [page.path, page])).values()]
}

export function getDocsPrerenderPages(
  projectRoot: string,
  config: DocsConfig = {},
  i18n: I18nConfig,
  {
    extraPages = [],
    includeDocsRoot = true,
    includeLocalizedDocsRoots = true,
    routes = []
  }: DocsPrerenderPagesOptions = {}
) {
  const resolved = resolveDocsConfig(config)
  const {
    defaultDocsStaticPaths,
    docsShellStaticPaths,
    docsStaticPathsByLocale
  } = getDocsStaticPaths(projectRoot, config, i18n)
  const routeEntries = routes.map(normalizeRoute).filter(shouldPrerenderRoute)

  for (const route of routeEntries) {
    assertSupportedRoute(route)
  }

  const globDocsRoutes = unique([
    ...routeEntries.flatMap(route => {
      const docsRoute = docsMirrorRouteFromRoute(route)

      return docsRoute ? [docsRoute] : []
    })
  ])
  const staticRoutes = routeEntries.filter(
    route => !routeRootFromGlob(route.path)
  )

  return uniquePrerenderPages([
    ...(includeDocsRoot ? [createDocsPrerenderPage(resolved.docsRoute)] : []),
    ...defaultDocsStaticPaths.map(createDocsPrerenderPage),
    ...globDocsRoutes.flatMap(route =>
      docsShellStaticPaths.map(pagePath =>
        createDocsPrerenderPage(
          replaceDocsRoute(pagePath, resolved.docsRoute, route)
        )
      )
    ),
    ...getNonDefaultLanguages(i18n).flatMap(lang =>
      globDocsRoutes.flatMap(route =>
        docsStaticPathsByLocale[lang]
          .filter(isDocsShellPath)
          .map(pagePath =>
            createDocsPrerenderPage(
              `/${lang}${replaceDocsRoute(pagePath, resolved.docsRoute, route)}`
            )
          )
      )
    ),
    ...getNonDefaultLanguages(i18n).flatMap(lang => [
      ...(includeLocalizedDocsRoots
        ? [
            createDocsPrerenderPage(`/${lang}`),
            createDocsPrerenderPage(`/${lang}${resolved.docsRoute}`)
          ]
        : []),
      ...docsStaticPathsByLocale[lang].map(pagePath =>
        createDocsPrerenderPage(`/${lang}${pagePath}`)
      )
    ]),
    ...routeEntries.flatMap(route =>
      createFilesystemRoutePrerenderPages(projectRoot, route)
    ),
    ...staticRoutes.map(createDocsPrerenderPageFromRoute),
    ...extraPages.map(normalizeDocsPrerenderPage)
  ])
}

export function getVxDocsPrerenderPages(
  projectRoot = process.cwd(),
  options: DocsPrerenderPagesOptions = {}
) {
  const { docs, i18n, routes } = loadVxDocsConfig(projectRoot)

  return getDocsPrerenderPages(projectRoot, docs, i18n, {
    ...options,
    routes: [...routes, ...(options.routes ?? [])]
  })
}

function assertGeneratedOutput(docsDir: string, outputDir: string) {
  const relativePath = path.relative(docsDir, outputDir)

  if (
    relativePath === '' ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.basename(outputDir) !== '(generated)' ||
    !relativePath.startsWith(`openapi${path.sep}`)
  ) {
    throw new Error(
      `Refusing to clear unexpected generated docs dir: ${outputDir}`
    )
  }
}

function discoverOpenAPISpecs(
  projectRoot: string,
  docsDir: string,
  openapiDirName: string
): OpenAPISpec[] {
  const specs: OpenAPISpec[] = []
  const openapiDir = path.join(projectRoot, openapiDirName)
  const folderSpecs = walkFiles(openapiDir)
    .filter(filePath => openapiExtensions.has(path.extname(filePath)))
    .sort((left, right) => left.localeCompare(right))

  for (const inputPath of folderSpecs) {
    const relativePath = path.relative(openapiDir, inputPath)
    const documentId = openAPISpecIdFromRelativePath(relativePath)
    const outputSegments = documentId === 'openapi' ? [] : documentId.split('/')

    specs.push({
      documentId,
      inputPath,
      outputDir: path.join(docsDir, 'openapi', ...outputSegments, '(generated)')
    })
  }

  const documentIds = new Set<string>()

  for (const spec of specs) {
    if (documentIds.has(spec.documentId)) {
      throw new Error(`Duplicate OpenAPI document id: ${spec.documentId}`)
    }

    documentIds.add(spec.documentId)
  }

  return specs
}

function pageNameFromMdx(fileName: string, languages: string[]) {
  const withoutMdx = fileName.slice(0, -'.mdx'.length)

  for (const language of languages) {
    const suffix = `.${language}`

    if (withoutMdx.endsWith(suffix)) {
      return withoutMdx.slice(0, -suffix.length)
    }
  }

  return withoutMdx
}

function pagesInDirectory(dir: string, languages: string[]) {
  const files = new Set<string>()
  const directories: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.add(pageNameFromMdx(entry.name, languages))
    }

    if (entry.isDirectory()) {
      directories.push(
        entry.name === '(generated)' ? `...${entry.name}` : entry.name
      )
    }
  }

  return [
    ...[...files].sort((left, right) => {
      if (left === 'index') return -1
      if (right === 'index') return 1

      return left.localeCompare(right)
    }),
    ...directories.sort((left, right) => left.localeCompare(right))
  ]
}

function synchronizeMetaFiles(
  docsDir: string,
  outputDirectories: string[],
  languages: string[]
) {
  const metaFiles = new Set(
    walkFiles(docsDir).filter(
      filePath => path.basename(filePath) === 'meta.json'
    )
  )

  for (const outputDirectory of outputDirectories) {
    metaFiles.add(path.join(path.dirname(outputDirectory), 'meta.json'))
  }

  for (const metaFile of [...metaFiles].sort()) {
    const metaDirectory = path.dirname(metaFile)
    const pages = pagesInDirectory(metaDirectory, languages)

    if (pages.length === 0) {
      continue
    }

    const existingContent = fs.existsSync(metaFile)
      ? fs.readFileSync(metaFile, 'utf8')
      : undefined
    const existing = existingContent
      ? (JSON.parse(existingContent) as Record<string, unknown>)
      : {}
    const content = `${JSON.stringify({ ...existing, pages }, null, 2)}\n`

    if (existingContent !== content) {
      fs.writeFileSync(metaFile, content)
    }
  }
}

export async function generateDocs(
  projectRoot: string,
  config: DocsConfig,
  i18n: I18nConfig
) {
  const resolved = resolveDocsConfig(config)
  const docsDir = path.resolve(projectRoot, resolved.docsDir)
  const specs = discoverOpenAPISpecs(projectRoot, docsDir, resolved.openapiDir)
  const generatedRoot = path.join(docsDir, 'openapi')

  fs.mkdirSync(docsDir, { recursive: true })

  for (const outputDir of generatedDirectories(generatedRoot)) {
    assertGeneratedOutput(docsDir, outputDir)
    fs.rmSync(outputDir, { force: true, recursive: true })
  }

  for (const spec of specs) {
    assertGeneratedOutput(docsDir, spec.outputDir)

    await OpenAPI.generateFiles({
      input: createOpenAPI({
        input: {
          [spec.documentId]: spec.inputPath
        }
      }),
      meta: true,
      output: spec.outputDir
    })
  }

  synchronizeMetaFiles(
    docsDir,
    specs.map(spec => spec.outputDir),
    i18n.languages
  )

  return specs.length
}

function titleFromPath(pagePath: string) {
  const segments = pagePath.split('/').filter(Boolean)
  const segment = segments[segments.length - 1] ?? 'Docs'

  return segment
    .split('-')
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getMdxEntries({
  defaultLanguage,
  docsDir,
  docsRoute,
  languages
}: I18nConfig & {
  docsRoute: string
  docsDir: string
}): DocsOgMeta[] {
  const localizedMdxSuffixes = languages
    .filter(lang => lang !== defaultLanguage)
    .map(lang => `.${lang}.mdx`)

  return walkFiles(docsDir).flatMap(filePath => {
    const relativePath = slash(path.relative(docsDir, filePath))

    if (
      !relativePath.endsWith('.mdx') ||
      localizedMdxSuffixes.some(suffix => relativePath.endsWith(suffix))
    ) {
      return []
    }

    const withoutMdx = relativePath.slice(0, -'.mdx'.length)
    const segments = withoutMdx
      .split('/')
      .filter(segment => !(segment.startsWith('(') && segment.endsWith(')')))

    if (segments[segments.length - 1] === 'index') {
      segments.pop()
    }

    const routePath = segments.length
      ? `${docsRoute}/${segments.join('/')}`
      : docsRoute
    const frontmatter = fs
      .readFileSync(filePath, 'utf8')
      .match(/^---\n([\s\S]*?)\n---/)
    const meta = frontmatter
      ? (parse(frontmatter[1]) as Record<string, unknown>)
      : {}

    return [
      {
        description:
          typeof meta.description === 'string'
            ? meta.description
            : 'Documentation',
        routePath,
        title:
          typeof meta.title === 'string' ? meta.title : titleFromPath(routePath)
      }
    ]
  })
}

function assertOutputDir(outputDir: string) {
  const parsed = path.parse(outputDir)

  if (outputDir === parsed.root || outputDir === process.cwd()) {
    throw new Error(`Refusing to clear unexpected OG output dir: ${outputDir}`)
  }
}

function getDocsOgOutputPaths({
  docsRoute,
  entryRoutePath,
  mirrorRoutes,
  outputDir
}: {
  docsRoute: string
  entryRoutePath: string
  mirrorRoutes: string[]
  outputDir: string
}) {
  const suffix =
    entryRoutePath === docsRoute ? '' : entryRoutePath.slice(docsRoute.length)
  const outputRoot = path.dirname(outputDir)
  const outputPaths = [
    path.join(outputDir, `${suffix}/image.png`.replace(/^\//, ''))
  ]

  if (entryRoutePath === docsRoute) {
    outputPaths.push(path.join(outputRoot, 'image.png'))
  }

  for (const mirrorRoute of mirrorRoutes) {
    outputPaths.push(
      path.join(
        outputRoot,
        mirrorRoute,
        `${suffix}/image.png`.replace(/^\//, '')
      )
    )
  }

  return outputPaths
}

export async function generateDocsOgImages(
  projectRoot: string,
  config: DocsConfig,
  i18n: I18nConfig,
  {
    routes = []
  }: {
    routes?: RouteInput[]
  } = {}
) {
  const resolved = resolveDocsConfig(config)
  const resolvedDocsDir = path.resolve(projectRoot, resolved.docsDir)
  const resolvedOutputDir = path.resolve(projectRoot, resolved.ogOutputDir)
  const mirrorRoutes = getDocsMirrorRoutes(routes).filter(
    route => route !== resolved.docsRoute
  )
  const entries = uniqueByRoute(
    getMdxEntries({
      ...i18n,
      docsDir: resolvedDocsDir,
      docsRoute: resolved.docsRoute
    })
  )

  assertOutputDir(resolvedOutputDir)
  fs.rmSync(resolvedOutputDir, { force: true, recursive: true })

  const generatedImageCounts = await Promise.all(
    entries.map(async entry => {
      const outputPaths = getDocsOgOutputPaths({
        docsRoute: resolved.docsRoute,
        entryRoutePath: entry.routePath,
        mirrorRoutes,
        outputDir: resolvedOutputDir
      })
      const response = generateOGImage({
        title: entry.title,
        description: entry.description
      })
      const image = Buffer.from(await response.arrayBuffer())

      for (const outputPath of outputPaths) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true })
        fs.writeFileSync(outputPath, image)
      }

      return outputPaths.length
    })
  )

  return generatedImageCounts.reduce((total, count) => total + count, 0)
}

export function loadVxDocsConfig(projectRoot = process.cwd()) {
  const configFile = path.join(projectRoot, 'vx.app.json')
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as VxDocsConfig

  if (!config.i18n) {
    throw new Error(`Missing docs language configuration in ${configFile}`)
  }

  return {
    config,
    configFile,
    docs: config.docs ?? {},
    i18n: config.i18n,
    routes: config.routes ?? []
  }
}
