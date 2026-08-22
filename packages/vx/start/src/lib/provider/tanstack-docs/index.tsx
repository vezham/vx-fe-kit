import { Outlet } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

import type { Props } from '../shared/types'
import { RootDocument } from '../tanstack'
import { DocsSearchDialog } from './search'

const defineConfig = (props: Props) => (
  <RootDocument {...props}>
    <RootProvider search={{ SearchDialog: DocsSearchDialog }}>
      <Outlet />
    </RootProvider>
  </RootDocument>
)

export { defineConfig, DocsSearchDialog }
