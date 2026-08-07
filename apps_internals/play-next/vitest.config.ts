/// <reference types='vitest' />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps_internals/play-next',
  plugins: [react()],
  test: {}
})
