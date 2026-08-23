import { createOpenAPI } from 'fumadocs-openapi/server'
import type { OpenAPIOptions } from 'fumadocs-openapi/server'
import { parse } from 'yaml'

import playgroundOpenApiYaml from '../../openapi.yaml?raw'

const playgroundOpenApi = parse(playgroundOpenApiYaml) as Exclude<
  NonNullable<OpenAPIOptions['input']>,
  string[]
>[string]

export const openapi = createOpenAPI({
  input: {
    playground: playgroundOpenApi
  }
})
