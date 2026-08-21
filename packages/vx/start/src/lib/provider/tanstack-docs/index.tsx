import { Outlet } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

import type { Props } from '../shared/types'
import { defineConfig as defineTanStackConfig } from '../tanstack'
import { DocsSearchDialog } from './search'

const defineConfig = ({ children, className, ...props }: Props) =>
  defineTanStackConfig({
    ...props,
    className: ['flex min-h-screen flex-col', className]
      .filter(Boolean)
      .join(' '),
    children: children ?? (
      <RootProvider search={{ SearchDialog: DocsSearchDialog }}>
        <Outlet />
      </RootProvider>
    )
  })

export { DocsSearchDialog, defineConfig }
