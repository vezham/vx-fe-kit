import { createOpenAPIFromSources } from '@vx/start/runtime/docs'

const openapiFiles = {
  ...import.meta.glob<string>('../../openapi/**/*.json', {
    eager: true,
    import: 'default',
    query: '?raw'
  }),
  ...import.meta.glob<string>('../../openapi/**/*.yaml', {
    eager: true,
    import: 'default',
    query: '?raw'
  }),
  ...import.meta.glob<string>('../../openapi/**/*.yml', {
    eager: true,
    import: 'default',
    query: '?raw'
  })
}

export const openapi = createOpenAPIFromSources({
  files: openapiFiles
})
