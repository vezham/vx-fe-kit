import story from '@fumadocs/story/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { nitro } from 'nitro/vite'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import { defineAppConfig } from '@vx/config/vite'

import { i18n } from './src/lib/i18n'

const require = createRequire(import.meta.url)
const reactDir = path.dirname(require.resolve('react/package.json'))
const docsDir = path.join(__dirname, 'content/docs')
const docsRoute = '/docs'
const localizedMdxSuffixes = i18n.languages
  .filter(lang => lang !== i18n.defaultLanguage)
  .map(lang => ({ lang, suffix: `.${lang}.mdx` }))

function unique<T>(values: T[]) {
  return [...new Set(values)]
}

function slash(value: string) {
  return value.split(path.sep).join('/')
}

function walkFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return walkFiles(entryPath)
    }

    return [entryPath]
  })
}

function docsPathFromMdx(filePath: string) {
  const relativePath = slash(path.relative(docsDir, filePath))

  if (!relativePath.endsWith('.mdx')) {
    return
  }

  const localizedSuffix = localizedMdxSuffixes.find(({ suffix }) =>
    relativePath.endsWith(suffix)
  )
  const locale = localizedSuffix?.lang ?? i18n.defaultLanguage
  const withoutExtension = localizedSuffix
    ? relativePath.slice(0, -localizedSuffix.suffix.length)
    : relativePath.slice(0, -'.mdx'.length)
  const segments = withoutExtension
    .split('/')
    .filter(segment => !(segment.startsWith('(') && segment.endsWith(')')))

  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }

  const routePath = segments.length
    ? `${docsRoute}/${segments.join('/')}`
    : docsRoute
  const markdownPath = segments.length
    ? `${docsRoute}/${segments.join('/')}.md`
    : `${docsRoute}/index.md`

  return { locale, routePath, markdownPath }
}

function getDocsStaticPaths(locale: string) {
  return unique(
    walkFiles(docsDir)
      .map(docsPathFromMdx)
      .filter(entry => entry?.locale === locale)
      .flatMap(entry => (entry ? [entry.routePath, entry.markdownPath] : []))
  )
}

const defaultDocsStaticPaths = getDocsStaticPaths(i18n.defaultLanguage)
const openApiStaticPaths = defaultDocsStaticPaths.filter(pagePath =>
  pagePath.startsWith(`${docsRoute}/openapi/`)
)
const docsShellStaticPaths = defaultDocsStaticPaths.filter(
  pagePath => !pagePath.endsWith('.md')
)
const uiDocsStaticPaths = docsShellStaticPaths.map(pagePath =>
  pagePath.replace(docsRoute, '/ui-docs')
)
const uiNotebookStaticPaths = docsShellStaticPaths.map(pagePath =>
  pagePath.replace(docsRoute, '/ui-notebook')
)
const docsStaticPathsByLocale = Object.fromEntries(
  i18n.languages.map(lang => [
    lang,
    unique([...getDocsStaticPaths(lang), ...openApiStaticPaths])
  ])
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
