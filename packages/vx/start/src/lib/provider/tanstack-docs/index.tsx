import { Outlet } from '@tanstack/react-router'
import {
  RootProvider,
  type RootProviderProps
} from 'fumadocs-ui/provider/tanstack'

import type { Props } from '../shared/types'
import { RootDocument } from '../tanstack'
import { DocsSearchDialog } from './search'

type DocsConfigProps = Props & {
  rootProvider?: Omit<RootProviderProps, 'children'>
}

const defineConfig = ({ rootProvider, ...props }: DocsConfigProps = {}) => {
  const { search, ...rootProviderProps } = rootProvider ?? {}

  return (
    <RootDocument {...props}>
      <RootProvider
        {...rootProviderProps}
        search={{ SearchDialog: DocsSearchDialog, ...search }}>
        <Outlet />
      </RootProvider>
    </RootDocument>
  )
}

export { defineConfig, DocsSearchDialog }
