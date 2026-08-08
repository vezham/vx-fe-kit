import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import type { PlaywrightTestConfig } from '@playwright/test'
import {
  defineConfig as definePlaywrightConfig,
  devices
} from '@playwright/test'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { loadEnvFile } from 'node:process'

type WebServerConfig = Exclude<
  NonNullable<PlaywrightTestConfig['webServer']>,
  unknown[]
>

export type PlaywrightConfig = Omit<PlaywrightTestConfig, 'webServer'> & {
  webServer: WebServerConfig
}

const defaultProjects: PlaywrightTestConfig['projects'] = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] }
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] }
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] }
  },

  // @vx/NOTE: branded browsers
  {
    name: 'Microsoft Edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' }
  },
  {
    name: 'Google Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' }
  },

  // @vx/NOTE: mobile browsers support
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] }
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] }
  }
]

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const defineConfig = (configFile: string, config: PlaywrightConfig) => {
  const envFile = join(dirname(configFile), '.env')

  if (existsSync(envFile)) {
    loadEnvFile(envFile)
  }

  // wjdlz/TODO: process.env['BASE_URL'] || `http://localhost:${port}` - For CI, you may want to set BASE_URL to the deployed application.
  const port = process.env.PRE_PORT || 8080
  const baseURL = process.env.BASE_URL || `http://localhost:${port}`
  const { projects, use, webServer, ...restConfig } = config

  return definePlaywrightConfig({
    ...nxE2EPreset(configFile, { testDir: './src' }),
    timeout: 120_000,
    workers: 1,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    ...restConfig,
    use: {
      baseURL,
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
      ...use
    },
    /* Run your local dev server before starting the tests */
    webServer: {
      url: baseURL,
      timeout: process.env.CI ? 400_000 : 300_000,
      reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === 'true',
      cwd: workspaceRoot,
      ...webServer
    },
    projects: projects ?? defaultProjects
  })
}
