import {
  existsSync,
  mkdirSync,
  readFileSync,
  watch,
  writeFileSync
} from 'node:fs'
import path from 'node:path'

import { validateFramework } from '../framework.ts'
import { getVxEnv, syncEnvContent } from './env.ts'
import {
  generatedNotice,
  getGeneratedMetadataModule,
  renderMetadataTemplate,
  stringifyManifest,
  syncIndexHtmlContent
} from './render.ts'
import {
  createVersionedAssetUrl,
  getProjectAssetBaseUrl,
  getStaticAssetUrl,
  lowerFirst,
  normalizeIcons,
  toAssetUrl
} from './runtime.ts'
import {
  type GenerateMetadataOptions,
  type MetadataFile,
  type VxConfig
} from './types.ts'

const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(file, 'utf8')) as T

const writeMetadataFile = ({ path: file, content }: MetadataFile) => {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content)
}

export const loadVxAppConfig = (projectRoot = process.cwd()) => {
  const configFile = path.resolve(projectRoot, 'vx.app.json')

  if (!existsSync(configFile)) {
    throw new Error(`Missing vx.app.json at ${configFile}`)
  }

  const config = readJson<VxConfig>(configFile)
  validateFramework(config.framework)
  return config
}

export const getMetadataFiles = (
  config: VxConfig,
  projectRoot = process.cwd()
): MetadataFile[] => {
  const { core, pwa } = config
  const publicDir = path.resolve(projectRoot, 'public')
  const indexFile = path.resolve(projectRoot, 'index.html')
  const envFile = path.resolve(projectRoot, '.env')
  const versionedAssetUrl = createVersionedAssetUrl(
    getProjectAssetBaseUrl(projectRoot),
    core.version
  )
  const manifest = {
    manifest_version: 1,
    version: core.version,
    id: core.id,
    name: core.name,
    short_name: core.shortName,
    description: lowerFirst(core.description),
    scope: pwa.scope,
    start_url: `${pwa.startUrl}?utm_source=homescreen&utm_medium=shortcut&pwa=true`,
    display: pwa.display,
    orientation: pwa.orientation,
    theme_color: config.branding.themeColor,
    background_color: config.branding.backgroundColor,
    categories: pwa.categories,
    icons: normalizeIcons(pwa.icons).map(icon => ({
      src: toAssetUrl(icon.src, versionedAssetUrl),
      sizes: icon.sizes,
      type: icon.type
    })),
    screenshots: pwa.screenshots.map(screenshot => ({
      src: toAssetUrl(screenshot.src, versionedAssetUrl),
      type: screenshot.type,
      sizes: screenshot.sizes
    })),
    shortcuts: pwa.shortcuts.map(shortcut => ({
      name: shortcut.name,
      short_name: shortcut.shortName,
      url: `${shortcut.url}?utm_source=jumplist&utm_medium=shortcut&pwa=true`,
      icons: normalizeIcons(shortcut.icons).map(icon => ({
        src: toAssetUrl(icon.src, versionedAssetUrl),
        sizes: icon.sizes,
        type: icon.type
      }))
    }))
  }
  const browserConfig = `<?xml version="1.0" encoding="utf-8" ?>
<!-- ${generatedNotice} -->
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo
        src="${versionedAssetUrl('icons/icon-square-70x70.png')}" />
      <square150x150logo
        src="${versionedAssetUrl('icons/icon-square-150x150.png')}" />
      <wide310x150logo
        src="${versionedAssetUrl('icons/icon-square-310x150.png')}" />
      <square310x310logo
        src="${versionedAssetUrl('icons/icon-square-310x310.png')}" />
      <tilecolor>transparent</tilecolor>
    </tile>
  </msapplication>
</browserconfig>
`
  const offlinePage = renderMetadataTemplate('offline.html', {
    generatedNotice,
    author: core.publisher.name,
    appName: core.name,
    imageUrl: getStaticAssetUrl('vassets/no-internet.svg', core.version)
  })
  const notFoundPage = renderMetadataTemplate('not-found.html', {
    generatedNotice,
    author: core.publisher.name,
    appName: core.name,
    imageUrl: getStaticAssetUrl('vassets/no-internet.svg', core.version)
  })

  return [
    {
      path: path.join(publicDir, 'manifest.webmanifest'),
      content: `${stringifyManifest(manifest)}\n`
    },
    {
      path: path.join(publicDir, 'browserconfig.xml'),
      content: browserConfig
    },
    {
      path: path.join(publicDir, 'robots.txt'),
      content: `# ${generatedNotice}\n# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:\n`
    },
    {
      path: path.join(publicDir, 'sw.js'),
      content: `/* ${generatedNotice} */\n/* global importScripts */\nimportScripts('https://static.cdn.vezham.com/workers/sw.js?vx=${core.version}')\n`
    },
    {
      path: path.join(publicDir, 'offline.html'),
      content: offlinePage
    },
    {
      path: path.join(publicDir, '404.html'),
      content: notFoundPage
    },
    ...(existsSync(indexFile)
      ? [
          {
            path: indexFile,
            content: syncIndexHtmlContent(
              readFileSync(indexFile, 'utf8'),
              config,
              projectRoot
            )
          }
        ]
      : []),
    {
      path: path.join(projectRoot, 'src/generated/vx.ts'),
      content: getGeneratedMetadataModule(config, projectRoot)
    },
    {
      path: envFile,
      content: syncEnvContent(
        existsSync(envFile) ? readFileSync(envFile, 'utf8') : '',
        getVxEnv(config)
      )
    }
  ]
}

export const generateMetadata = (options: GenerateMetadataOptions = {}) => {
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd())
  const files = getMetadataFiles(loadVxAppConfig(projectRoot), projectRoot)

  for (const file of files) {
    writeMetadataFile(file)
  }

  return files.map(file => file.path)
}

export const watchMetadata = (options: GenerateMetadataOptions = {}) => {
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd())
  const configFile = path.join(projectRoot, 'vx.app.json')
  const regenerate = () => {
    const files = generateMetadata(options)

    console.log(`Generated ${files.length} metadata files from ${configFile}`)
  }

  regenerate()

  return watch(configFile, { persistent: true }, regenerate)
}

// vx-bot/NOTE: Preserve the public options type at the metadata entry point.
export type { GenerateMetadataOptions } from './types.ts'
