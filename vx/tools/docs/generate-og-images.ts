import { generateOGImage } from 'fumadocs-ui/og'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

type DocsConfig = {
  docsDir?: string
  docsRoute?: string
  outputDir?: string
}

type I18nConfig = {
  defaultLanguage: string
  languages: string[]
}

type VxConfig = {
  docs?: DocsConfig
  i18n?: I18nConfig
}

type DocsOgMeta = {
  description: string
  routePath: string
  title: string
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
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return walkFiles(entryPath)
    }

    return [entryPath]
  })
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
}: Required<
  Pick<I18nConfig, 'defaultLanguage' | 'languages'> & {
    docsRoute: string
    docsDir: string
  }
>): DocsOgMeta[] {
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

    const withoutExtension = relativePath.slice(0, -'.mdx'.length)
    const segments = withoutExtension
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

async function generateDocsOgImages(
  projectRoot: string,
  {
    defaultLanguage,
    docsDir = 'content/docs',
    docsRoute = '/docs',
    languages,
    outputDir = 'public/og-docs'
  }: I18nConfig & DocsConfig
) {
  const resolvedDocsDir = path.resolve(projectRoot, docsDir)
  const resolvedOutputDir = path.resolve(projectRoot, outputDir)
  const entries = uniqueByRoute(
    getMdxEntries({
      defaultLanguage,
      docsDir: resolvedDocsDir,
      docsRoute,
      languages
    })
  )

  assertOutputDir(resolvedOutputDir)
  fs.rmSync(resolvedOutputDir, { force: true, recursive: true })

  await Promise.all(
    entries.map(async entry => {
      const suffix =
        entry.routePath === docsRoute
          ? ''
          : entry.routePath.slice(docsRoute.length)
      const outputPath = path.join(
        resolvedOutputDir,
        `${suffix}/image.png`.replace(/^\//, '')
      )
      const response = generateOGImage({
        title: entry.title,
        description: entry.description
      })

      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, Buffer.from(await response.arrayBuffer()))
    })
  )

  return entries.length
}

async function main() {
  const projectRoot = path.resolve(process.argv[2] ?? process.cwd())
  const configFile = path.join(projectRoot, 'vx.config.json')
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as VxConfig
  const i18nConfig = config.i18n

  if (!i18nConfig) {
    throw new Error(`Missing docs language configuration in ${configFile}`)
  }

  const count = await generateDocsOgImages(projectRoot, {
    ...config.docs,
    ...i18nConfig
  })

  console.log(`Generated ${count} OG images for ${projectRoot}`)
}

void main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
