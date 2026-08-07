import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { type UserConfig, loadConfigFromFile, mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const configFile = fileURLToPath(import.meta.url)
const sharedSetupFile = path.resolve(rootDir, 'vx/__tests__/setup.ts')

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

const getProjectName = () => {
  const packageJsonFile = path.resolve(process.cwd(), 'package.json')

  if (!existsSync(packageJsonFile)) {
    return path.basename(process.cwd())
  }

  try {
    return JSON.parse(readFileSync(packageJsonFile, 'utf8')).name as string
  } catch {
    return path.basename(process.cwd())
  }
}

export default defineConfig(async () => {
  const baseConfig = {
    resolve: {
      tsconfigPaths: true
    },
    test: {
      name: getProjectName(),
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
  } satisfies UserConfig

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
  const mergedConfig = mergeConfig(baseConfig, projectConfig) as UserConfig

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
