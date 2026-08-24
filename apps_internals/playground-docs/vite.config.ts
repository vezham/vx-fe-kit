import story from '@fumadocs/story/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { nitro } from 'nitro/vite'
import { createRequire } from 'node:module'
import path from 'node:path'

import { defineAppConfig } from '@vx/config/vite'

import { i18n } from './src/lib/i18n'

const require = createRequire(import.meta.url)
const reactDir = path.dirname(require.resolve('react/package.json'))
const docsStaticPaths = [
  '/docs/test',
  '/docs/index.md',
  '/docs/test.md',
  '/docs/openapi/getAllData',
  '/docs/openapi/createPlanet',
  '/docs/openapi/getPlanet',
  '/docs/openapi/updatePlanet',
  '/docs/openapi/deletePlanet',
  '/docs/openapi/uploadImage',
  '/docs/openapi/createCelestialBody',
  '/docs/openapi/createUser',
  '/docs/openapi/getToken',
  '/docs/openapi/getMe',
  '/docs/openapi/getHeartbeat',
  '/docs/openapi/getSearchIndex'
]
const prerenderPage = (pagePath: string) => ({
  path: pagePath,
  prerender:
    pagePath.endsWith('.md') || pagePath.startsWith('/api/')
      ? undefined
      : {
          outputPath: `${pagePath}/index.html`
        }
})

export default defineAppConfig(({ command }) => ({
  root: __dirname,
  preview:
    process.env.TSS_PRERENDERING === 'true'
      ? {
          host: 'localhost',
          port: 0
        }
      : undefined,
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
      // if you have any hidden paths that's not visible on UI, you can add them explicitly.
      // pages: [
      //   {
      //     path: '/docs/test',
      //   },
      // ],
      pages: [
        prerenderPage('/docs'),
        ...docsStaticPaths.map(prerenderPage),
        ...i18n.languages.flatMap(lang => [
          prerenderPage(`/${lang}`),
          prerenderPage(`/${lang}/docs`),
          ...docsStaticPaths.map(pagePath => ({
            ...prerenderPage(`/${lang}${pagePath}`),
            path: `/${lang}${pagePath}`
          }))
        ]),
        prerenderPage('/api/search'),
        {
          path: '/llms-full.txt'
        },
        {
          path: '/llms.txt'
        }
      ]
    }),
    react()
  ]
}))
