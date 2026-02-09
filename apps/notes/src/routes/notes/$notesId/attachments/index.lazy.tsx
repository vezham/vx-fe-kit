import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../../../pages/home2'
import Page from '../../../../pages/menu/layout'
import Sidebar from '../../../../pages/sidebar'

export const Route = createLazyFileRoute('/notes/$notesId/attachments/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Page
      sidebar={<Sidebar />}
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Notes', href: '/notes' },
        { label: 'Settings', href: '/settings' }
      ]}>
      <div>Single userid Attachments </div>
    </Page>
  )
}
