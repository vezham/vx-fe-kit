import { describe, expect, it } from 'vitest'

import { getMetadataFiles } from './index'

const config: Parameters<typeof getMetadataFiles>[0] = {
  core: {
    id: 'test',
    name: 'Test',
    shortName: 'Test',
    version: '1',
    description: 'Test app',
    publisher: { name: 'Test', url: 'https://example.com' },
    url: 'https://example.com'
  },
  branding: { themeColor: '#000', backgroundColor: '#fff' },
  pwa: {
    display: 'standalone',
    orientation: 'any',
    scope: '/',
    startUrl: '/',
    categories: [],
    icons: [],
    screenshots: [],
    shortcuts: []
  },
  metadata: {
    title: 'Test',
    keywords: [],
    theme: {
      lightColor: '#fff',
      darkColor: '#000',
      lightBackgroundColor: '#fff',
      darkBackgroundColor: '#000'
    },
    platforms: {
      apple: {
        mobileWebAppCapable: true,
        webAppCapable: true,
        touchIcon: '/icon.png',
        startupImages: []
      },
      microsoft: { startUrl: '/' }
    },
    social: {
      openGraph: { type: 'website' },
      twitter: { creator: '@test', site: '@test', card: 'summary' }
    }
  }
}

const generatedModule = (i18n?: typeof config.i18n) =>
  getMetadataFiles({ ...config, i18n }).find(file =>
    file.path.endsWith('/src/generated/vx.ts')
  )!.content

describe('generated language metadata', () => {
  it('defaults both metadata and i18n to English when omitted', () => {
    const source = generatedModule()
    expect(source.match(/"defaultLanguage": "en"/g)).toHaveLength(2)
    expect(source.match(/"languages": \[\s*"en"\s*\]/g)).toHaveLength(2)
    expect(source).not.toContain('vxI18n = undefined')
  })

  it('preserves the configured default and supported languages', () => {
    const source = generatedModule({
      defaultLanguage: 'ta',
      languages: ['en', 'ta']
    })
    expect(source.match(/"defaultLanguage": "ta"/g)).toHaveLength(2)
    expect(source.match(/"languages": \[\s*"en",\s*"ta"\s*\]/g)).toHaveLength(2)
  })
})
