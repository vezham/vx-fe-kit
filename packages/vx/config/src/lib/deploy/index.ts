import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

type HostingProvider = 'firebase'

type DeployPreset = 'cdn' | 'spa' | 'start-spa'

type VxDeployConfig = {
  preset?: DeployPreset
  providers: HostingProvider[]
  redirectDefaultLanguage?: boolean
  firebase?: FirebaseDeployConfig
}

type VxAppConfig = {
  docs?: {
    docsRoute?: string
  }
  i18n?: {
    defaultLanguage: string
    languages: string[]
  }
  routes?: RouteConfig[]
}

type RouteConfig = {
  path: string
  source?: string
}

type FirebaseDeployConfig = {
  cleanUrls?: boolean
  headers?: false | FirebaseHeader[] | FirebaseHeaderOptions
  ignore?: string[]
  public?: string
  redirects?: FirebaseRedirect[]
  rewrites?: false | FirebaseRewrite[]
}

type FirebaseHeaderOptions = {
  app?: boolean
  docs?: boolean
  routes?: boolean
  static?: boolean
}

type FirebaseHeader = {
  source: string
  headers: Array<{
    key: string
    value: string
  }>
}

type FirebaseRedirect = {
  source: string
  destination: string
  type: number
}

type FirebaseRewrite = {
  source: string
  destination: string
}

type FirebaseConfig = {
  hosting: {
    public: string
    ignore: string[]
    cleanUrls?: boolean
    headers?: FirebaseHeader[]
    redirects?: FirebaseRedirect[]
    rewrites?: FirebaseRewrite[]
  }
}

type FirebaseDeployPreset = {
  public: string
  fallback?: string
  rewrites?: FirebaseRewrite[]
}

export type GenerateDeployConfigOptions = {
  projectRoot?: string
}

type DeployFile = {
  path: string
  content: string
}

const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(file, 'utf8')) as T

const writeDeployFile = ({ path: file, content }: DeployFile) => {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content)
}

const normalizePath = (value: string) => value.split(path.sep).join('/')

const findWorkspaceRoot = (projectRoot: string) => {
  let currentDir = path.resolve(projectRoot)

  while (true) {
    if (existsSync(path.join(currentDir, 'nx.json'))) {
      return currentDir
    }

    const parentDir = path.dirname(currentDir)

    if (parentDir === currentDir) {
      return process.cwd()
    }

    currentDir = parentDir
  }
}

const loadJsonConfig = <T>(projectRoot: string, fileName: string) => {
  const configFile = path.resolve(projectRoot, fileName)

  return existsSync(configFile) ? readJson<T>(configFile) : undefined
}

const cacheHeader = (source: string, value: string): FirebaseHeader => ({
  source,
  headers: [
    {
      key: 'Cache-Control',
      value
    }
  ]
})

const unique = <T>(values: T[]) => [...new Set(values)]

const firebaseDeployPresets: Record<DeployPreset, FirebaseDeployPreset> = {
  cdn: {
    public: 'dist',
    rewrites: [
      {
        source: '/api/heartbeat',
        destination: '/api/heartbeat.json'
      },
      {
        source: '/api/pulse',
        destination: '/api/pulse.txt'
      }
    ]
  },
  spa: {
    public: 'dist',
    fallback: '/index.html'
  },
  'start-spa': {
    public: '.output/public',
    fallback: '/_shell.html'
  }
}

const defaultFirebaseDeployPreset: FirebaseDeployPreset =
  firebaseDeployPresets['start-spa']

const getFirebaseDeployPreset = (preset?: DeployPreset) =>
  preset ? firebaseDeployPresets[preset] : defaultFirebaseDeployPreset

const getDefaultFirebaseHeaders = (
  appConfig: VxAppConfig,
  options: FirebaseHeaderOptions = {},
  fallback?: string
) => {
  const {
    app = true,
    docs = Boolean(appConfig.docs),
    routes = true,
    static: staticAssets = true
  } = options
  const docsRoute = appConfig.docs?.docsRoute ?? '/docs'
  const localizedDocsRoutes = (appConfig.i18n?.languages ?? [])
    .filter(language => language !== appConfig.i18n?.defaultLanguage)
    .flatMap(language => {
      const localizedDocsRoute = `/${language}${docsRoute}`

      return [localizedDocsRoute, `${localizedDocsRoute.replace(/\/$/, '')}/**`]
    })
  const routeSources = unique(
    [
      ...(app ? ['/'] : []),
      ...(docs
        ? [
            docsRoute,
            `${docsRoute.replace(/\/$/, '')}/**`,
            ...localizedDocsRoutes
          ]
        : []),
      ...(routes
        ? (appConfig.routes ?? [])
            .map(route => route.path)
            .filter(route => route.startsWith('/api'))
        : [])
    ].filter(Boolean)
  )

  return [
    ...(staticAssets
      ? [
          cacheHeader('/sw.js', 'no-cache,no-store,must-revalidate'),
          cacheHeader('/manifest.webmanifest', 'public,max-age=300'),
          ...(fallback ? [cacheHeader(fallback, 'public,max-age=300')] : []),
          cacheHeader('/assets/**', 'public,max-age=31536000,immutable'),
          cacheHeader('**/*.@(html|json|txt|md)', 'public,max-age=300')
        ]
      : []),
    ...routeSources.map(source => cacheHeader(source, 'public,max-age=300'))
  ]
}

const getDefaultLanguageRedirects = (
  appConfig: VxAppConfig
): FirebaseRedirect[] => {
  const defaultLanguage = appConfig.i18n?.defaultLanguage

  return defaultLanguage
    ? [
        {
          source: `/${defaultLanguage}`,
          destination: '/',
          type: 301
        },
        {
          source: `/${defaultLanguage}/:path*`,
          destination: '/:path',
          type: 301
        }
      ]
    : []
}

const resolveProjectPath = (workspaceRoot: string, projectRoot: string) =>
  normalizePath(path.relative(workspaceRoot, projectRoot))

const resolveFirebasePublicDir = (
  workspaceRoot: string,
  projectRoot: string,
  publicDir = '.output/public'
) => {
  const resolvedPublicDir = path.isAbsolute(publicDir)
    ? publicDir
    : path.join(projectRoot, publicDir)

  return normalizePath(path.relative(workspaceRoot, resolvedPublicDir))
}

const getFirebaseConfig = (
  workspaceRoot: string,
  projectRoot: string,
  appConfig: VxAppConfig,
  deployConfig: VxDeployConfig
): FirebaseConfig => {
  const firebase = deployConfig.firebase ?? {}
  const preset = getFirebaseDeployPreset(deployConfig.preset)
  const headers =
    firebase.headers === false
      ? undefined
      : Array.isArray(firebase.headers)
        ? firebase.headers
        : getDefaultFirebaseHeaders(
            appConfig,
            firebase.headers,
            preset.fallback
          )
  const redirects = [
    ...(firebase.redirects ?? []),
    ...(deployConfig.redirectDefaultLanguage
      ? getDefaultLanguageRedirects(appConfig)
      : [])
  ]
  const rewrites =
    firebase.rewrites === false
      ? undefined
      : (firebase.rewrites ??
        preset.rewrites ??
        (preset.fallback
          ? [
              {
                source: '**',
                destination: preset.fallback
              }
            ]
          : undefined))

  return {
    hosting: {
      public: resolveFirebasePublicDir(
        workspaceRoot,
        projectRoot,
        firebase.public ?? preset.public
      ),
      ignore: firebase.ignore ?? [
        'firebase.json',
        '**/.*',
        '**/node_modules/**',
        '**/*.d.ts',
        '**/*.d.ts.map',
        '**/*.tsbuildinfo'
      ],
      cleanUrls: firebase.cleanUrls ?? true,
      ...(headers ? { headers } : {}),
      ...(redirects.length > 0 ? { redirects } : {}),
      ...(rewrites ? { rewrites } : {})
    }
  }
}

const getFirebaseDeployFile = (
  workspaceRoot: string,
  projectRoot: string,
  appConfig: VxAppConfig,
  deployConfig: VxDeployConfig
): DeployFile => {
  const projectPath = resolveProjectPath(workspaceRoot, projectRoot)

  return {
    path: path.join(workspaceRoot, 'vx/deploy/firebase', `${projectPath}.json`),
    content: `${JSON.stringify(
      getFirebaseConfig(workspaceRoot, projectRoot, appConfig, deployConfig),
      null,
      2
    )}\n`
  }
}

const getDeployFiles = (
  appConfig: VxAppConfig,
  deployConfig: VxDeployConfig,
  projectRoot: string
): DeployFile[] => {
  const workspaceRoot = findWorkspaceRoot(projectRoot)

  return deployConfig.providers.map(provider => {
    if (provider === 'firebase') {
      return getFirebaseDeployFile(
        workspaceRoot,
        projectRoot,
        appConfig,
        deployConfig
      )
    }

    throw new Error(`Unsupported deploy provider "${provider}"`)
  })
}

export const generateDeployConfig = (
  options: GenerateDeployConfigOptions = {}
) => {
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd())
  const appConfig = loadJsonConfig<VxAppConfig>(projectRoot, 'vx.app.json')
  const deployConfig = loadJsonConfig<VxDeployConfig>(
    projectRoot,
    'vx.deploy.json'
  )

  if (!appConfig || !deployConfig) {
    return []
  }

  const files = getDeployFiles(appConfig, deployConfig, projectRoot)

  for (const file of files) {
    writeDeployFile(file)
  }

  return files.map(file => file.path)
}
