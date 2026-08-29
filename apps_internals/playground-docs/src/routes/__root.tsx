import { createRootRoute } from '@tanstack/react-router'

import {
  createRootComponent,
  redirectDefaultLocale
} from '@vx/start/tanstack-docs'

import { i18n } from '@app/docs'
import { tanstackHead } from '@generated/vx'

const RootComponent = createRootComponent({
  i18n,
  translations: {
    en: {
      displayName: 'English'
    },
    cn: {
      displayName: '中文',
      'Search(search trigger)': '搜尋'
    }
  }
})

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    redirectDefaultLocale(i18n, location)
  },
  head: () => tanstackHead,
  component: RootComponent
})
