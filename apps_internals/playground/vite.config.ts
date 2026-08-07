import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const { env } = process
  const hostname = env.CI ? 'localhost' : env.HOST_NAME || 'localhost'

  return {
    envPrefix: ['V_'],
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps_internals/playground',
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
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      tailwindcss()
    ],
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    test: {}
  }
})
