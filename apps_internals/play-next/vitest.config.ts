/// <reference types='vitest' />
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps_internals/play-next',
  plugins: [react(), tsconfigPaths()],
  test: {
    name: 'play-next',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: [
      '{src,tests,__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    setupFiles: [path.resolve(rootDir, '../../vx/__tests__/setup.ts')],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const
    }
  }
})
