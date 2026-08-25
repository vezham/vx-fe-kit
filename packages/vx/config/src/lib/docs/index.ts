import * as OpenAPI from 'fumadocs-openapi'
import { createOpenAPI } from 'fumadocs-openapi/server'
import { generateOGImage } from 'fumadocs-ui/og'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

export type DocsConfig = {
  contentDir?: string
  docsDir?: string
  docsRoute?: string
  openapiDir?: string
  outputDir?: string
}

export type I18nConfig = {
  defaultLanguage: string
  languages: string[]
}

export type VxDocsConfig = {
  docs?: DocsConfig
  i18n?: I18nConfig
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

const defaultContentDir = 'content/docs'
const defaultDocsRoute = '/docs'
const defaultOpenApiDir = 'openapi'
const defaultOgOutputDir = 'public/og/docs'
const openapiExtensions = new Set(['.json', '.yaml', '.yml'])

export function resolveDocsConfig(config: DocsConfig = {}) {
  return {
    docsDir: config.docsDir ?? config.contentDir ?? defaultContentDir,
    docsRoute: config.docsRoute ?? defaultDocsRoute,
    openapiDir: config.openapiDir ?? defaultOpenApiDir,
    ogOutputDir: config.outputDir ?? defaultOgOutputDir
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

function getLocalizedMdxSuffixes(i18n: I18nConfig) {
  return i18n.languages
    .filter(lang => lang !== i18n.defaultLanguage)
    .map(lang => ({ lang, suffix: `.${lang}.mdx` }))
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
  const rootSpec = path.join(projectRoot, 'openapi.yaml')

  if (fs.existsSync(rootSpec)) {
    specs.push({
      documentId: 'openapi',
      inputPath: rootSpec,
      outputDir: path.join(docsDir, 'openapi', '(generated)')
    })
  }

  const openapiDir = path.join(projectRoot, openapiDirName)
  const folderSpecs = walkFiles(openapiDir)
    .filter(filePath => openapiExtensions.has(path.extname(filePath)))
    .sort((left, right) => left.localeCompare(right))

  for (const inputPath of folderSpecs) {
    const relativePath = path.relative(openapiDir, inputPath)
    const relativeWithoutExtension = withoutExtension(relativePath)

    specs.push({
      documentId: slash(relativeWithoutExtension),
      inputPath,
      outputDir: path.join(
        docsDir,
        'openapi',
        relativeWithoutExtension,
        '(generated)'
      )
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

export async function generateDocsOgImages(
  projectRoot: string,
  config: DocsConfig,
  i18n: I18nConfig
) {
  const resolved = resolveDocsConfig(config)
  const resolvedDocsDir = path.resolve(projectRoot, resolved.docsDir)
  const resolvedOutputDir = path.resolve(projectRoot, resolved.ogOutputDir)
  const entries = uniqueByRoute(
    getMdxEntries({
      ...i18n,
      docsDir: resolvedDocsDir,
      docsRoute: resolved.docsRoute
    })
  )

  assertOutputDir(resolvedOutputDir)
  fs.rmSync(resolvedOutputDir, { force: true, recursive: true })

  await Promise.all(
    entries.map(async entry => {
      const suffix =
        entry.routePath === resolved.docsRoute
          ? ''
          : entry.routePath.slice(resolved.docsRoute.length)
      const outputPaths = [
        path.join(resolvedOutputDir, `${suffix}/image.png`.replace(/^\//, ''))
      ]
      const response = generateOGImage({
        title: entry.title,
        description: entry.description
      })
      const image = Buffer.from(await response.arrayBuffer())

      if (entry.routePath === resolved.docsRoute) {
        outputPaths.push(
          path.join(path.dirname(resolvedOutputDir), 'image.png')
        )
      }

      for (const outputPath of outputPaths) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true })
        fs.writeFileSync(outputPath, image)
      }
    })
  )

  return entries.length
}

export function loadVxDocsConfig(projectRoot = process.cwd()) {
  const configFile = path.join(projectRoot, 'vx.config.json')
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as VxDocsConfig

  if (!config.i18n) {
    throw new Error(`Missing docs language configuration in ${configFile}`)
  }

  return {
    config,
    configFile,
    docs: config.docs ?? {},
    i18n: config.i18n
  }
}
