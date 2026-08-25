import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsTitle,
  DocsPage as FumadocsDocsPage,
  MarkdownCopyButton,
  ViewOptionsPopover
} from 'fumadocs-ui/layouts/docs/page'
import { DocsLayout as FumadocsNotebookLayout } from 'fumadocs-ui/layouts/notebook'
import {
  DocsBody as NotebookDocsBody,
  DocsDescription as NotebookDocsDescription,
  DocsPage as NotebookDocsPage,
  DocsTitle as NotebookDocsTitle
} from 'fumadocs-ui/layouts/notebook/page'
import type { ComponentProps, ReactNode } from 'react'

export type DocsShell = 'docs' | 'notebook'

export type DocsLayoutProps = {
  children: ReactNode
  shell?: DocsShell
} & Omit<ComponentProps<typeof FumadocsDocsLayout>, 'children'> &
  Omit<ComponentProps<typeof FumadocsNotebookLayout>, 'children'>

export type DocsPageProps = {
  children: ReactNode
  description?: ReactNode
  full?: boolean
  markdownUrl?: string
  shell?: DocsShell
  title?: ReactNode
  toc: ComponentProps<typeof FumadocsDocsPage>['toc']
}

export function DocsLayout({
  children,
  shell = 'docs',
  ...props
}: DocsLayoutProps) {
  const Layout =
    shell === 'notebook' ? FumadocsNotebookLayout : FumadocsDocsLayout

  return <Layout {...props}>{children}</Layout>
}

export function DocsPage({
  children,
  description,
  full,
  markdownUrl,
  shell = 'docs',
  title,
  toc
}: DocsPageProps) {
  const Page = shell === 'notebook' ? NotebookDocsPage : FumadocsDocsPage
  const Body = shell === 'notebook' ? NotebookDocsBody : DocsBody
  const Description =
    shell === 'notebook' ? NotebookDocsDescription : DocsDescription
  const Title = shell === 'notebook' ? NotebookDocsTitle : DocsTitle

  if (full) {
    return (
      <Page full toc={toc}>
        {children}
      </Page>
    )
  }

  return (
    <Page toc={toc}>
      {title ? <Title>{title}</Title> : null}
      {description ? <Description>{description}</Description> : null}
      {markdownUrl ? (
        <div className="-mt-4 flex flex-row items-center gap-2 border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover markdownUrl={markdownUrl} />
        </div>
      ) : null}
      <Body>{children}</Body>
    </Page>
  )
}

export const DocsLayoutShell = DocsLayout
export const DocsPageShell = DocsPage
