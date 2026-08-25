import story from '@fumadocs/story/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { nitro } from 'nitro/vite'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import type { DocsConfig } from '@vx/config/docs'
import { getDocsStaticPaths, resolveDocsConfig } from '@vx/config/docs'
import { defineAppConfig } from '@vx/config/vite'

import { i18n } from './src/lib/i18n'

const require = createRequire(import.meta.url)
const reactDir = path.dirname(require.resolve('react/package.json'))
const vxConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'vx.config.json'), 'utf8')
) as { docs?: DocsConfig }
const docsConfig = vxConfig.docs ?? {}
const { docsRoute } = resolveDocsConfig(docsConfig)
const {
  defaultDocsStaticPaths,
  docsShellStaticPaths,
  docsStaticPathsByLocale
} = getDocsStaticPaths(__dirname, docsConfig, i18n)
const uiDocsStaticPaths = docsShellStaticPaths.map(pagePath =>
  pagePath.replace(docsRoute, '/ui-docs')
)
const uiNotebookStaticPaths = docsShellStaticPaths.map(pagePath =>
  pagePath.replace(docsRoute, '/ui-notebook')
)
const prerenderPage = (pagePath: string) => ({
  path: pagePath,
  prerender:
    pagePath.endsWith('.md') ||
    pagePath.endsWith('.png') ||
    pagePath.startsWith('/api/')
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
        ...defaultDocsStaticPaths.map(prerenderPage),
        ...uiDocsStaticPaths.map(prerenderPage),
        ...uiNotebookStaticPaths.map(prerenderPage),
        ...i18n.languages.flatMap(lang => [
          prerenderPage(`/${lang}`),
          prerenderPage(`/${lang}/docs`),
          ...docsStaticPathsByLocale[lang].map(pagePath => ({
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
