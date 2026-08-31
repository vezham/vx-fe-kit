import type { ComponentProps, ReactNode } from 'react'

import { DocsLayout as DocsLayoutPrimitive } from '@vezham/docs-react/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage as DocsPagePrimitive,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover
} from '@vezham/docs-react/layouts/docs/page'
import { DocsLayout as NotebookLayoutPrimitive } from '@vezham/docs-react/layouts/notebook'
import {
  DocsBody as NotebookDocsBody,
  DocsDescription as NotebookDocsDescription,
  DocsPage as NotebookDocsPage,
  DocsTitle as NotebookDocsTitle
} from '@vezham/docs-react/layouts/notebook/page'

export type DocsShell = 'docs' | 'notebook'

export type DocsLayoutProps = {
  children: ReactNode
  shell?: DocsShell
} & Omit<ComponentProps<typeof DocsLayoutPrimitive>, 'children'> &
  Omit<ComponentProps<typeof NotebookLayoutPrimitive>, 'children'>

export type DocsPageProps = {
  children: ReactNode
  description?: ReactNode
  full?: boolean
  markdownUrl?: string
  shell?: DocsShell
  title?: ReactNode
  toc: ComponentProps<typeof DocsPagePrimitive>['toc']
}

export function DocsLayout({
  children,
  shell = 'docs',
  ...props
}: DocsLayoutProps) {
  const Layout =
    shell === 'notebook' ? NotebookLayoutPrimitive : DocsLayoutPrimitive

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
  const Page = shell === 'notebook' ? NotebookDocsPage : DocsPagePrimitive
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
