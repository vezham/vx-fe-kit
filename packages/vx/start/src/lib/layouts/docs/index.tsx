import type { ComponentProps, ReactNode } from 'react'
import { createElement } from 'react'

import { DocsLayout as DocsLayoutPrimitive } from '@vezham/docs-react/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage as DocsPagePrimitive,
  DocsTitle
} from '@vezham/docs-react/layouts/docs/page'
import { DocsLayout as FluxLayoutPrimitive } from '@vezham/docs-react/layouts/flux'
import * as FluxPage from '@vezham/docs-react/layouts/flux/page'
import { GlassLayout } from '@vezham/docs-react/layouts/glass'
import * as GlassPage from '@vezham/docs-react/layouts/glass/page'
import { HomeLayout } from '@vezham/docs-react/layouts/home'
import { DocsLayout as NotebookLayoutPrimitive } from '@vezham/docs-react/layouts/notebook'
import {
  DocsBody as NotebookDocsBody,
  DocsDescription as NotebookDocsDescription,
  DocsPage as NotebookDocsPage,
  DocsTitle as NotebookDocsTitle
} from '@vezham/docs-react/layouts/notebook/page'

import { PageActions } from './page-actions'

export type DocsShell = 'docs' | 'flux' | 'glass' | 'home' | 'notebook'

export type DocsLayoutProps = {
  children: ReactNode
  shell?: DocsShell
} & Omit<
  ComponentProps<typeof DocsLayoutPrimitive>,
  'children' | 'sidebar' | 'tabs' | 'tabMode'
> &
  Omit<
    ComponentProps<typeof NotebookLayoutPrimitive>,
    'children' | 'tabs' | 'tabMode'
  > &
  Pick<ComponentProps<typeof NotebookLayoutPrimitive>, 'tabs'> & {
    tabMode?:
      | ComponentProps<typeof DocsLayoutPrimitive>['tabMode']
      | ComponentProps<typeof NotebookLayoutPrimitive>['tabMode']
  }

export type DocsPageProps = {
  children: ReactNode
  description?: ReactNode
  full?: boolean
  markdownUrl?: string
  shell?: DocsShell
  title?: ReactNode
  toc: ComponentProps<typeof DocsPagePrimitive>['toc']
}

export const DocsLayout = ({
  children,
  shell = 'docs',
  ...props
}: DocsLayoutProps) => {
  const {
    tree,
    nav,
    links,
    githubUrl,
    i18n,
    themeSwitch,
    searchToggle,
    tabMode,
    ...layoutProps
  } = props
  const base = { nav, links, githubUrl, i18n, themeSwitch, searchToggle }

  if (shell === 'home') return <HomeLayout {...base}>{children}</HomeLayout>
  if (shell === 'glass')
    return (
      <GlassLayout {...base} tree={tree} tabs={{ transform: option => option }}>
        {children}
      </GlassLayout>
    )
  if (shell === 'flux')
    return (
      <FluxLayoutPrimitive
        {...base}
        tree={tree}
        containerProps={{ className: '[&>[data-layout-main]]:w-full' }}>
        {children}
      </FluxLayoutPrimitive>
    )

  if (shell === 'notebook') {
    return (
      <NotebookLayoutPrimitive
        {...base}
        {...layoutProps}
        tree={tree}
        tabMode={
          tabMode === 'top'
            ? 'navbar'
            : tabMode === 'auto'
              ? 'sidebar'
              : tabMode
        }>
        {children}
      </NotebookLayoutPrimitive>
    )
  }

  const { sidebar, ...docsLayoutProps } = layoutProps
  const { banner, footer, ...sidebarProps } = sidebar ?? {}

  return (
    <DocsLayoutPrimitive
      {...base}
      {...docsLayoutProps}
      sidebar={
        sidebar && {
          ...sidebarProps,
          banner: typeof banner === 'function' ? createElement(banner) : banner,
          footer: typeof footer === 'function' ? createElement(footer) : footer
        }
      }
      tree={tree}
      tabMode={
        tabMode === 'navbar' ? 'top' : tabMode === 'sidebar' ? 'auto' : tabMode
      }>
      {children}
    </DocsLayoutPrimitive>
  )
}

const pages = {
  docs: {
    Page: DocsPagePrimitive,
    Body: DocsBody,
    Description: DocsDescription,
    Title: DocsTitle
  },
  notebook: {
    Page: NotebookDocsPage,
    Body: NotebookDocsBody,
    Description: NotebookDocsDescription,
    Title: NotebookDocsTitle
  },
  flux: {
    Page: FluxPage.DocsPage,
    Body: FluxPage.DocsBody,
    Description: FluxPage.DocsDescription,
    Title: FluxPage.DocsTitle
  },
  glass: {
    Page: GlassPage.DocsPage,
    Body: GlassPage.DocsBody,
    Description: GlassPage.DocsDescription,
    Title: GlassPage.DocsTitle
  }
}

export const DocsPage = ({
  children,
  description,
  full,
  markdownUrl,
  shell = 'docs',
  title,
  toc
}: DocsPageProps) => {
  const { Page, Body, Description, Title } =
    pages[shell === 'home' ? 'docs' : shell]
  const content = full ? (
    <Body>{children}</Body>
  ) : (
    <>
      {title || markdownUrl ? (
        <div className="flex flex-col items-start gap-3 lg:flex-row lg:justify-between lg:gap-4">
          {title ? <Title>{title}</Title> : <span />}
          {markdownUrl ? <PageActions markdownUrl={markdownUrl} /> : null}
        </div>
      ) : null}
      {description ? <Description>{description}</Description> : null}
      <Body>{children}</Body>
    </>
  )

  if (shell === 'home') {
    return (
      <article
        className={`mx-auto flex w-full min-w-0 flex-col gap-4 px-6 py-10 ${full ? 'max-w-7xl' : 'max-w-4xl'}`}>
        {content}
      </article>
    )
  }

  return (
    <Page full={full} toc={toc}>
      {content}
    </Page>
  )
}

export const DocsLayoutShell = DocsLayout
export const DocsPageShell = DocsPage
