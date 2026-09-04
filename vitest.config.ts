import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadConfigFromFile, mergeConfig } from 'vite'
import type { Plugin } from 'vite'

import { docsMdx, docsMdxMacroImportAlias } from '@vx/config/presets/docs'
import { type ViteConfig, getProjectPackageName } from '@vx/config/vite'
import { defineConfig } from '@vx/config/vitest'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const configFile = fileURLToPath(import.meta.url)
const sharedSetupFile = path.resolve(rootDir, 'vx/__tests__/setup.ts')

const slash = (value: string) => value.split(path.sep).join('/')

function projectRootImportAlias(): Plugin {
  return {
    name: '@vx/config:vitest-project-root-import-alias',
    enforce: 'pre',
    resolveId(source) {
      if (!source.startsWith('/openapi/')) {
        return null
      }

      const [filePath, query] = source.split('?', 2)
      const resolvedPath = slash(path.resolve(process.cwd(), filePath.slice(1)))

      return query ? `${resolvedPath}?${query}` : resolvedPath
    },
    transform(code) {
      if (!code.includes('/openapi/')) {
        return null
      }

      return code
        .replaceAll(
          '"/openapi/',
          `"${slash(path.resolve(process.cwd(), 'openapi'))}/`
        )
        .replaceAll(
          "'/openapi/",
          `'${slash(path.resolve(process.cwd(), 'openapi'))}/`
        )
    }
  }
}

const toArray = <T>(value: T | T[] | undefined): T[] => {
  if (value === undefined) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

const findProjectConfig = () => {
  const projectRoot = process.cwd()
  const candidates = [
    'vitest.config.ts',
    'vitest.config.mts',
    'vitest.config.js',
    'vitest.config.mjs'
  ]

  return candidates
    .map(candidate => path.resolve(projectRoot, candidate))
    .find(candidate => candidate !== configFile && existsSync(candidate))
}

export default defineConfig(async () => {
  const baseConfig = {
    plugins: [
      projectRootImportAlias(),
      docsMdxMacroImportAlias({
        rewriteContentBase: true
      }),
      docsMdx()
    ],
    resolve: {
      tsconfigPaths: true
    },
    test: {
      name: getProjectPackageName(),
      watch: false,
      globals: true,
      environment: 'jsdom',
      setupFiles: [sharedSetupFile],
      include: [
        '{src,tests,__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const
      }
    }
  } satisfies ViteConfig

  const projectConfigFile = findProjectConfig()

  if (!projectConfigFile) {
    return baseConfig
  }

  const loadedProjectConfig = await loadConfigFromFile(
    {
      command: 'serve',
      mode: 'test',
      isSsrBuild: false,
      isPreview: false
    },
    projectConfigFile,
    process.cwd()
  )
  const projectConfig = loadedProjectConfig?.config ?? {}
  const mergedConfig = mergeConfig(baseConfig, projectConfig) as ViteConfig

  return {
    ...mergedConfig,
    test: {
      ...mergedConfig.test,
      setupFiles: [
        sharedSetupFile,
        ...toArray(mergedConfig.test?.setupFiles).filter(
          setupFile => setupFile !== sharedSetupFile
        )
      ]
    }
  }
})
