import type { OpenAPIOptions } from 'fumadocs-openapi/server'
import { createOpenAPI } from 'fumadocs-openapi/server'
import { parse } from 'yaml'

import openApiYaml from '../../openapi.yaml?raw'

type OpenAPIDocument = Exclude<
  NonNullable<OpenAPIOptions['input']>,
  string[]
>[string]

function parseOpenAPIDocument(
  filePath: string,
  source: string
): OpenAPIDocument {
  return (
    filePath.endsWith('.json') ? JSON.parse(source) : parse(source)
  ) as OpenAPIDocument
}

function documentIdFromPath(filePath: string) {
  return filePath
    .replace('../../openapi/', '')
    .replace(/\.(?:json|yaml|yml)$/, '')
}

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

export const openapi = createOpenAPI({
  input: {
    openapi: parseOpenAPIDocument('openapi.yaml', openApiYaml),
    ...Object.fromEntries(
      Object.entries(openapiFiles).map(([filePath, source]) => [
        documentIdFromPath(filePath),
        parseOpenAPIDocument(filePath, source)
      ])
    )
  }
})
