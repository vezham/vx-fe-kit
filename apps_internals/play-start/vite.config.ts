/// <reference types='vitest' />
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const { env } = process
  const hostname = env.CI ? 'localhost' : env.HOST_NAME || 'localhost'

  return {
    envPrefix: ['V_'],
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps_internals/play-start',
    server: {
      port: Number(env.PORT),
      host: hostname
    },
    preview: {
      port: Number(env.PRE_PORT) || Number(env.PORT),
      host: hostname
    },
    resolve: {
      tsconfigPaths: true
    },
    plugins: [
      devtools(),
      nitro({ rollupConfig: { external: [/^@sentry\//] } }),
      tailwindcss(),
      tanstackStart(),
      react()
    ],
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    test: {
      name: 'play-start',
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: [
        '{src,tests,__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const
      }
    }
  }
})
