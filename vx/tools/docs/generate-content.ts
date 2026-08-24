import * as OpenAPI from 'fumadocs-openapi'
import { createOpenAPI } from 'fumadocs-openapi/server'
import fs from 'node:fs'
import path from 'node:path'

type DocsConfig = {
  contentDir?: string
  openapiDir?: string
}

type I18nConfig = {
  defaultLanguage: string
  languages: string[]
}

type VxConfig = {
  docs?: DocsConfig
  i18n?: I18nConfig
}

type OpenAPISpec = {
  documentId: string
  inputPath: string
  outputDir: string
}

const openapiExtensions = new Set(['.json', '.yaml', '.yml'])

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

async function generateDocs(
  projectRoot: string,
  config: DocsConfig,
  i18n: I18nConfig
) {
  const docsDir = path.resolve(projectRoot, config.contentDir ?? 'content/docs')
  const specs = discoverOpenAPISpecs(
    projectRoot,
    docsDir,
    config.openapiDir ?? 'openapi'
  )
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

async function main() {
  const projectRoot = path.resolve(process.argv[2] ?? process.cwd())
  const configFile = path.join(projectRoot, 'vx.config.json')
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as VxConfig

  if (!config.i18n) {
    throw new Error(`Missing i18n configuration in ${configFile}`)
  }

  const count = await generateDocs(projectRoot, config.docs ?? {}, config.i18n)

  console.log(`Generated documentation for ${count} OpenAPI specifications`)
}

void main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
