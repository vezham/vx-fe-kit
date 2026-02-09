import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '../pages/home'
import Home2 from '../pages/home2'
import Page from '../pages/menu'

export const Route = createLazyFileRoute('/')({
  // component: () => <Home />
  component: () => (
    <Page
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Notes', href: '/notes' },
        { label: 'Settings', href: '/settings' }
      ]}></Page>
  )
})
