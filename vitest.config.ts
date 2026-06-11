import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(rootDir, 'vx/__tests__/setup.ts')]
  }
})
