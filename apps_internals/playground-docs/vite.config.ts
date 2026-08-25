import story from '@fumadocs/story/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { nitro } from 'nitro/vite'
import path from 'node:path'

import { getVxDocsPrerenderPages } from '@vx/config/docs'
import { defineAppConfig } from '@vx/config/vite'

export default defineAppConfig({
  root: __dirname,
  resolve: {
    dedupe: ['fumadocs-core', 'fumadocs-ui']
  },
  plugins: [
    fumadocsMdx(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    story({
      tsconfigPath: path.join(__dirname, 'tsconfig.app.json')
    }),
    tanstackStart({
      spa: {
        enabled: true,
        // wjdlz/NOTE: Tanstack Router will automatically crawl your pages
        prerender: {
          enabled: true,
          crawlLinks: true
        }
      },
      pages: getVxDocsPrerenderPages(__dirname)
    }),
    react()
  ]
})
