import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
import type { ConfigEnv, UserConfig, UserConfigExport } from 'vite'

const findWorkspaceRoot = (startDir = process.cwd()) => {
  let currentDir = path.resolve(startDir)

  while (currentDir !== path.dirname(currentDir)) {
    if (existsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
      return currentDir
    }

    currentDir = path.dirname(currentDir)
  }

  return path.resolve(startDir)
}

export const getProjectPackageName = (projectRoot = process.cwd()) => {
  const packageJsonFile = path.resolve(projectRoot, 'package.json')

  if (!existsSync(packageJsonFile)) {
    return path.basename(projectRoot)
  }

  try {
    return JSON.parse(readFileSync(packageJsonFile, 'utf8')).name as string
  } catch {
    return path.basename(projectRoot)
  }
}

export const getViteCacheDir = (projectRoot = process.cwd()) =>
  path.resolve(
    findWorkspaceRoot(projectRoot),
    'node_modules/.vite',
    getProjectPackageName(projectRoot)
  )

export type ViteConfig = UserConfig & {
  test?: Record<string, unknown>
}

type ViteConfigFactory = (env: ConfigEnv) => ViteConfig | Promise<ViteConfig>

type ViteConfigOverrides = ViteConfig | ViteConfigFactory

type TsConfigWithPaths = {
  compilerOptions?: {
    paths?: Record<string, string[]>
  }
}

const trimTrailingWildcard = (value: string) =>
  value.endsWith('/*') ? value.slice(0, -2) : value

const getTsConfigPathAliases = (projectRoot = process.cwd()) => {
  const tsconfigFile = path.resolve(projectRoot, 'tsconfig.app.json')

  if (!existsSync(tsconfigFile)) {
    return {}
  }

  try {
    const tsconfig = JSON.parse(
      readFileSync(tsconfigFile, 'utf8')
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

  return {
    port: Number(env.PRE_PORT) || Number(env.PORT),
    host: hostname
  }
}

export const getViteConfig = (projectRoot = process.cwd()): ViteConfig => ({
  root: projectRoot,
  cacheDir: getViteCacheDir(projectRoot),
  test: {}
})

export const getAppViteConfig = (projectRoot = process.cwd()): ViteConfig => ({
  ...getViteConfig(projectRoot),
  envPrefix: ['V_'],
  server: getServerConfig(),
  preview: getPreviewConfig(),
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

const createConfig = (
  getDefaults: (projectRoot?: string) => ViteConfig,
  overrides: ViteConfigOverrides = {}
): UserConfigExport =>
  defineViteConfig(async env => {
    const resolvedOverrides =
      typeof overrides === 'function' ? await overrides(env) : overrides
    const projectRoot = path.resolve(
      String(resolvedOverrides.root ?? process.cwd())
    )

    return mergeConfig(
      getDefaults(projectRoot),
      resolvedOverrides
    ) as ViteConfig
  })

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  createConfig(getViteConfig, overrides)

export const defineVitestConfig = (overrides: ViteConfigOverrides = {}) =>
  createConfig(getViteConfig, overrides)

export const defineAppConfig = (overrides: ViteConfigOverrides = {}) =>
  createConfig(getAppViteConfig, overrides)

export const defineLibConfig = (overrides: ViteConfigOverrides = {}) =>
  createConfig(getViteConfig, overrides)
