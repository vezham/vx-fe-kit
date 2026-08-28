import { Link } from '@tanstack/react-router'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import type { ComponentProps } from 'react'
import { Suspense, use } from 'react'

import { DocsLayout, DocsPage, type DocsShell } from '@vx/start/layouts/docs'
import { getMDXComponents } from '@vx/start/mdx'
import { OpenAPIPage } from '@vx/start/pages/docs/openapi'

import { docs } from '@app/docs'
import type { LoadedDocsPage } from '@app/docs-page'
import { baseOptions } from '@config/layout'

type OpenAPIPageComponentProps = ComponentProps<typeof OpenAPIPage>

function Content({
  path,
  markdownUrl,
  openapiData,
  shell
}: {
  path: string
  markdownUrl: string
  openapiData: LoadedDocsPage['openapiData']
  shell: DocsShell
}) {
  const page = docs.getPage(path)

  if (!page) {
    throw new Error(`unknown page: ${path}`)
  }

  const { toc } = use(page.load())
  const MDX = page.body
  const components = getMDXComponents(
    openapiData
      ? {
          APIPage: props => (
            <OpenAPIPage
              {...({ ...openapiData, ...props } as OpenAPIPageComponentProps)}
            />
          ),
          OpenAPIPage: props => (
            <OpenAPIPage
              {...({ ...openapiData, ...props } as OpenAPIPageComponentProps)}
            />
          )
        }
      : undefined
  )

  if (openapiData) {
    return (
      <DocsPage full shell={shell} toc={toc}>
        <MDX components={components} />
      </DocsPage>
    )
  }

  return (
    <DocsPage
      description={page.description}
      markdownUrl={markdownUrl}
      shell={shell}
      title={page.title}
      toc={toc}>
      <MDX components={components} />
    </DocsPage>
  )
}

export function DocsRoutePage({
  data,
  shell = 'docs'
}: {
  data: LoadedDocsPage
  shell?: DocsShell
}) {
  const page = useFumadocsLoader(data)
  const content = (
    <>
      <Link to={page.markdownUrl} hidden />
      <Suspense>
        <Content
          path={page.path}
          markdownUrl={page.markdownUrl}
          openapiData={page.openapiData}
          shell={shell}
        />
      </Suspense>
    </>
  )

  return (
    <DocsLayout
      {...baseOptions(page.locale)}
      shell={shell}
      tree={page.pageTree}>
      {content}
    </DocsLayout>
  )
}
