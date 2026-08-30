import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
import type { ConfigEnv } from 'vite'

import {
  type ViteConfig,
  type ViteConfigOverrides,
  getViteConfig
} from '@vx/config/vite'

type TsConfigWithPaths = {
  compilerOptions?: {
    paths?: Record<string, string[]>
  }
}

const trimTrailingWildcard = (value: string) =>
  value.endsWith('/*') ? value.slice(0, -2) : value

const getTsConfigPathAliases = (projectRoot = process.cwd()) => {
  const tsconfigFile = path.resolve(projectRoot, 'tsconfig.app.json')

  if (!fs.existsSync(tsconfigFile)) {
    return {}
  }

  try {
    const tsconfig = JSON.parse(
      fs.readFileSync(tsconfigFile, 'utf8')
    ) as TsConfigWithPaths
    const paths = tsconfig.compilerOptions?.paths ?? {}

    return Object.fromEntries(
      Object.entries(paths)
        .map(([alias, values]) => {
          const value = values[0]

          if (!value) {
            return null
          }

          return [
            trimTrailingWildcard(alias),
            path.resolve(projectRoot, trimTrailingWildcard(value))
          ]
        })
        .filter(entry => entry !== null)
    )
  } catch {
    return {}
  }
}

const getServerConfig = () => {
  const { env } = process
  const hostname = env.CI ? 'localhost' : env.HOST_NAME || 'localhost'

  return {
    port: Number(env.PORT),
    host: hostname
  }
}

const getPreviewConfig = () => {
  const { env } = process
  const hostname = env.CI ? 'localhost' : env.HOST_NAME || 'localhost'
  const configuredPort = Number(env.PRE_PORT) || Number(env.PORT)

  return {
    port: env.TSS_PRERENDERING === 'true' ? 0 : configuredPort || undefined,
    host: hostname
  }
}

const getReactPackageDir = (projectRoot = process.cwd()) => {
  const requireFromProject = createRequire(
    path.join(projectRoot, 'package.json')
  )

  return path.dirname(requireFromProject.resolve('react/package.json'))
}

const getViteDefaults = (projectRoot = process.cwd()): ViteConfig => ({
  ...getViteConfig(projectRoot),
  envPrefix: ['V_'],
  server: getServerConfig(),
  resolve: {
    alias: getTsConfigPathAliases(projectRoot),
    tsconfigPaths: true
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})

const getPreviewOverride = (env: ConfigEnv): ViteConfig => ({
  preview:
    process.env.TSS_PRERENDERING === 'true'
      ? {
          host: 'localhost',
          port: 0
        }
      : env.command === 'build'
        ? undefined
        : getPreviewConfig()
})

const getResolveOverride = (
  env: ConfigEnv,
  projectRoot = process.cwd()
): ViteConfig => ({
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias:
      env.command === 'build'
        ? {
            'react/jsx-dev-runtime': path.join(
              getReactPackageDir(projectRoot),
              'cjs/react-jsx-dev-runtime.development.js'
            )
          }
        : undefined
  }
})

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineViteConfig(async env => {
    const resolvedOverrides =
      typeof overrides === 'function' ? await overrides(env) : overrides
    const projectRoot = path.resolve(
      String(resolvedOverrides.root ?? process.cwd())
    )

    return mergeConfig(
      mergeConfig(
        mergeConfig(getViteDefaults(projectRoot), getPreviewOverride(env)),
        getResolveOverride(env, projectRoot)
      ),
      resolvedOverrides
    ) as ViteConfig
  })

export type PrerenderPage = {
  path: string
  prerender?: {
    outputPath: string
  }
}

export type RouteConfig = {
  path: string
  prerender?:
    | boolean
    | {
        outputPath?: string
      }
  source?: 'routes'
}

export type RouteInput = RouteConfig | string

type VxAppConfig = {
  routes?: RouteInput[]
}

export type PrerenderPagesOptions = {
  routes?: RouteInput[]
}

const routeFileExtensions = new Set(['.js', '.jsx', '.ts', '.tsx'])

function unique<T>(values: T[]) {
  return [...new Set(values)]
}

function uniquePrerenderPages(pages: PrerenderPage[]) {
  return [...new Map(pages.map(page => [page.path, page])).values()]
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

function withoutExtension(filePath: string) {
  return filePath.slice(0, -path.extname(filePath).length)
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
    .filter(segment => segment !== '__root' && segment !== '__root__')

  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }

  if (segments[segments.length - 1]?.endsWith('.lazy')) {
    const index = segments.length - 1

    segments[index] = segments[index].slice(0, -'.lazy'.length)
  }

  if (segments[segments.length - 1] === 'route') {
    segments.pop()
  }

  const routeSegments = segments
    .filter(segment => !isPathlessRouteSegment(segment))
    .map(decodeRouteSegment)

  if (routeSegments.some(isDynamicRouteSegment)) {
    return
  }

  return routeSegments.length === 0 ? '/' : `/${routeSegments.join('/')}`
}

function getStaticPageRoutes(projectRoot: string) {
  const routesDir = path.join(projectRoot, 'src/routes')

  return unique(
    walkFiles(routesDir)
      .filter(filePath => ['.jsx', '.tsx'].includes(path.extname(filePath)))
      .map(filePath => routePathFromFile(routesDir, filePath))
      .filter(routePath => routePath !== undefined)
      .filter(routePath => !routePath.startsWith('/api/'))
      .sort((left, right) => left.localeCompare(right))
  )
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

function createPrerenderPage(route: RouteConfig): PrerenderPage {
  if (typeof route.prerender === 'object' && route.prerender.outputPath) {
    return {
      path: route.path,
      prerender: {
        outputPath: route.prerender.outputPath
      }
    }
  }

  const shouldWriteIndex =
    route.path !== '/' &&
    path.extname(route.path) === '' &&
    !route.path.startsWith('/api/')

  return {
    path: route.path,
    prerender: shouldWriteIndex
      ? {
          outputPath: `${route.path}/index.html`
        }
      : undefined
  }
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
    createPrerenderPage({ ...route, path: pagePath })
  )
}

function assertSupportedRoute(route: RouteConfig) {
  if (!routeRootFromGlob(route.path) || route.source === 'routes') {
    return
  }

  throw new Error(
    `Unsupported route source "${route.source ?? 'none'}" for glob route "${route.path}". Use source "routes" or provide an exact path.`
  )
}

export function getPrerenderPages(
  projectRoot = process.cwd(),
  { routes: extraRoutes = [] }: PrerenderPagesOptions = {}
) {
  const configFile = path.join(projectRoot, 'vx.app.json')
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as VxAppConfig
  const routes = [...(config.routes ?? []), ...extraRoutes]
  const routeEntries = routes.map(normalizeRoute)

  for (const route of routeEntries) {
    assertSupportedRoute(route)
  }

  return uniquePrerenderPages([
    createPrerenderPage({ path: '/' }),
    ...getStaticPageRoutes(projectRoot).map(pagePath =>
      createPrerenderPage({ path: pagePath })
    ),
    ...routeEntries.flatMap(route =>
      route.prerender === false
        ? []
        : createFilesystemRoutePrerenderPages(projectRoot, route)
    ),
    ...routeEntries
      .filter(route => !routeRootFromGlob(route.path))
      .filter(route => route.prerender !== false)
      .map(createPrerenderPage)
  ])
}
