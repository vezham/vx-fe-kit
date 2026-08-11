import {
  existsSync,
  mkdirSync,
  readFileSync,
  watch,
  writeFileSync
} from 'node:fs'
import path from 'node:path'

type VxConfig = {
  id: string
  name: string
  shortName?: string
  version: string
  description?: string
  publisher?: {
    name?: string
    url?: string
  }
  branding?: {
    themeColor?: string
    backgroundColor?: string
  }
  pwa?: {
    display?: string
    orientation?: string
    scope?: string
    startUrl?: string
  }
}

export type GenerateMetadataOptions = {
  projectRoot?: string
  publicDir?: string
}

type MetadataFile = {
  path: string
  content: string
}

const generatedIconSizes = [48, 72, 96, 128, 192, 384, 512, 1024]

const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(file, 'utf8')) as T

const lowerFirst = (value: string) =>
  value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : value

const normalizePath = (value: string) => value.split(path.sep).join('/')

const getProjectAssetBaseUrl = (projectRoot: string) =>
  `https://static.cdn.vezham.com/${normalizePath(path.relative(process.cwd(), projectRoot))}`

const createVersionedAssetUrl = (baseUrl: string, version: string) => {
  const versionParam = `vx=${encodeURIComponent(version)}`

  return (assetPath: string) =>
    `${baseUrl.replace(/\/$/, '')}/${assetPath.replace(/^\//, '')}?${versionParam}`
}

const getStaticAssetUrl = (assetPath: string, version: string) =>
  `https://static.cdn.vezham.com/${assetPath.replace(/^\//, '')}?vx=${encodeURIComponent(version)}`

const writeMetadataFile = ({ path: file, content }: MetadataFile) => {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content)
}

const stringifyManifest = (manifest: Record<string, unknown>) =>
  JSON.stringify(manifest, null, 2).replace(
    '"categories": [\n    "productivity",\n    "personalization",\n    "utilities"\n  ]',
    '"categories": ["productivity", "personalization", "utilities"]'
  )

export const loadVxConfig = (projectRoot = process.cwd()) => {
  const configFile = path.resolve(projectRoot, 'vx.config.json')

  if (!existsSync(configFile)) {
    throw new Error(`Missing vx.config.json at ${configFile}`)
  }

  return readJson<VxConfig>(configFile)
}

export const getMetadataFiles = (
  config: VxConfig,
  projectRoot = process.cwd()
): MetadataFile[] => {
  const publicDir = path.resolve(projectRoot, 'public')
  const versionedAssetUrl = createVersionedAssetUrl(
    getProjectAssetBaseUrl(projectRoot),
    config.version
  )
  const startUrl = config.pwa?.startUrl ?? '/'
  const themeColor = config.branding?.themeColor ?? '#000000'
  const backgroundColor = config.branding?.backgroundColor ?? '#ffffff'
  const manifest = {
    manifest_version: 1,
    version: config.version,
    id: config.id,
    name: config.name,
    short_name: config.shortName ?? config.name,
    description: lowerFirst(config.description ?? ''),
    scope: config.pwa?.scope ?? '.',
    start_url: `${startUrl}?utm_source=homescreen&utm_medium=shortcut&pwa=true`,
    display: config.pwa?.display ?? 'standalone',
    orientation: config.pwa?.orientation ?? 'any',
    theme_color: themeColor,
    background_color: backgroundColor,
    categories: ['productivity', 'personalization', 'utilities'],
    icons: generatedIconSizes.map(size => ({
      src: versionedAssetUrl(`icons/icon-${size}x${size}.png`),
      sizes: `${size}x${size}`,
      type: 'image/png'
    })),
    screenshots: [
      {
        src: versionedAssetUrl('screenshots/home-512x512.png'),
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    shortcuts: [
      {
        name: 'Home',
        short_name: 'Home',
        url: `${startUrl}?utm_source=jumplist&utm_medium=shortcut&pwa=true`,
        icons: [
          {
            src: versionedAssetUrl('shortcuts/icon-home-192x192.png'),
            type: 'image/png',
            sizes: '192x192'
          }
        ]
      }
    ]
  }
  const browserConfig = `<?xml version="1.0" encoding="utf-8" ?>
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
  const offlinePage = `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=1, shrink-to-fit=no" />
    <meta name="author" content="${config.publisher?.name ?? ''}" />
    <title>Offline | ${config.name}</title>
  </head>

  <body>
    <div class="offline-container">
      <img
        src="${getStaticAssetUrl('vassets/no-internet.svg', config.version)}"
        alt="offline"
        class="offline-image" />
      <div class="offline-header">Oops! You're offline</div>
      <div class="offline-text">
        Please check your connection and try again.
      </div>
      <div class="offline-button" onclick="handleHome()">Retry</div>
    </div>
  </body>

  <style>
    body {
      margin: 0px;
      font-family: 'Poppins', serif;
    }

    .offline-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 100vh !important;
      justify-content: center;
      text-align: center;
      width: 100%;
    }

    .offline-header {
      font-size: 3rem;
      font-weight: 700;
    }

    .offline-text {
      font-size: 1.5rem;
    }

    .offline-button {
      border-radius: 50px;
      cursor: pointer;
      flex: 0 1 !important;
      padding: 15px 20px;
      font-size: 2rem;
      background-color: oklch(50.768% 0.23111 261.795);
    }

    .offline-button:hover {
      background-color: oklch(54.881% 0.24991 261.799 / 0.25);
    }

    @media (prefers-color-scheme: light) {
      body {
        background: oklch(100% 0.00011 271.152);
      }

      .offline-header {
        color: oklch(0% 0 0);
      }

      .offline-text {
        color: oklch(0% 0 0 / 0.5);
      }

      .offline-button {
        color: oklch(100% 0.00011 271.152);
      }

      .offline-button:hover {
        color: oklch(0% 0 0);
      }
    }

    @media (prefers-color-scheme: dark) {
      body {
        background: oklch(23.929% 0.00003 271.152);
      }

      .offline-header {
        color: oklch(100% 0.00011 271.152);
      }

      .offline-text {
        color: oklch(100% 0.00011 271.152 / 0.5);
      }

      .offline-button {
        color: oklch(100% 0.00011 271.152);
      }

      .offline-button:hover {
        color: oklch(100% 0.00011 271.152);
      }
    }

    @media (min-width: 0px) and (max-width: 1024px) {
      .offline-image {
        width: 70%;
      }
    }

    @media only screen and (orientation: landscape) {
      .offline-image {
        width: 30%;
      }

      .offline-header {
        font-size: 2rem;
      }

      .offline-text,
      .offline-button {
        font-size: 1rem;
      }
    }
  </style>
  <script>
    function handleHome() {
      window.location.href = '/'
    }
  </script>
</html>
`

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
      content:
        '# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:\n'
    },
    {
      path: path.join(publicDir, 'sw.js'),
      content: `/* global importScripts */\nimportScripts('https://static.cdn.vezham.com/workers/sw.js?vx=${config.version}')\n`
    },
    {
      path: path.join(publicDir, 'offline.html'),
      content: offlinePage
    },
    {
      path: path.join(publicDir, 'api/hello.json'),
      content: `${JSON.stringify(
        {
          status: true,
          message: 'Hello from Vezham :)'
        },
        null,
        2
      )}\n`
    }
  ]
}

export const generateMetadata = (options: GenerateMetadataOptions = {}) => {
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd())
  const files = getMetadataFiles(loadVxConfig(projectRoot), projectRoot)

  for (const file of files) {
    const outputPath = options.publicDir
      ? path.join(
          path.resolve(options.publicDir),
          path.relative(path.join(projectRoot, 'public'), file.path)
        )
      : file.path

    writeMetadataFile({
      ...file,
      path: outputPath
    })
  }

  return files.map(file => file.path)
}

export const watchMetadata = (options: GenerateMetadataOptions = {}) => {
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd())
  const configFile = path.join(projectRoot, 'vx.config.json')
  const regenerate = () => {
    const files = generateMetadata(options)

    console.log(`Generated ${files.length} metadata files from ${configFile}`)
  }

  regenerate()

  return watch(configFile, { persistent: true }, regenerate)
}
