import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '../../pages/home'
import Home2 from '../../pages/home2'
import Page from '../../pages/menu'

export const Route = createLazyFileRoute('/shared-with-me/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      {/* <Home>
        <div>Home-overview</div>
      </Home> */}

      <Page
        menu={[
          { label: 'Home', href: '/' },
          { label: 'Notes', href: '/notes' },
          { label: 'Settings', href: '/settings' }
        ]}>
        <div>Shared Notes</div>
      </Page>
    </>
  )
}
