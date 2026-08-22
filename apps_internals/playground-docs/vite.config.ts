import story from '@fumadocs/story/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { nitro } from 'nitro/vite'
import { createRequire } from 'node:module'
import path from 'node:path'

import { defineAppConfig } from '@vx/config/vite'

const require = createRequire(import.meta.url)
const reactDir = path.dirname(require.resolve('react/package.json'))

export default defineAppConfig(({ command }) => ({
  root: __dirname,
  resolve: {
    dedupe: ['fumadocs-core', 'fumadocs-ui', 'react', 'react-dom'],
    alias:
      command === 'build'
        ? {
            'react/jsx-dev-runtime': path.join(
              reactDir,
              'cjs/react-jsx-dev-runtime.development.js'
            )
          }
        : undefined
  },
  plugins: [
    fumadocsMdx(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    story(),
    tanstackStart({
      spa: {
        enabled: true,
        // wjdlz/NOTE: Tanstack Router will automatically crawl your pages
        prerender: {
          enabled: true,
          crawlLinks: true
        }
      },
      // if you have any hidden paths that's not visible on UI, you can add them explicitly.
      // pages: [
      //   {
      //     path: '/docs/test',
      //   },
      // ],
      pages: [
        {
          path: '/docs'
        },
        {
          path: '/api/search'
        },
        {
          path: 'llms-full.txt'
        },
        {
          path: 'llms.txt'
        }
      ]
    }),
    react()
  ]
}))
