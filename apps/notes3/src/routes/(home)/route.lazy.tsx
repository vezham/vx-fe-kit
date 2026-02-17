import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../components/menu/layout'
import Sidebar from '../../components/sidebar'
import { useNotes } from '../../pages/notes/store'

export const Route = createLazyFileRoute('/(home)')({
  component: RouteComponent
})

function RouteComponent() {
  const { counts } = useNotes()

  return (
    <Page
      header={[
        { icon: 'mdi:bell-outline', href: '/notifications' },
        { icon: 'mdi:cog-outline', href: '/settings' },
        { icon: 'mdi:account-group', href: '/teams' },
        { icon: 'mdi:upload', href: '/shared' },
        { icon: 'mdi:help-circle-outline', href: '/cta/help-support' }
      ]}
      sidebar={
        <Sidebar
          sidebar={[
            { label: 'All', href: '/all', count: counts.all },
            { label: 'Pinned', href: '/pinned', count: counts.pinned },
            { label: 'Folders', href: '/folders' },
            { label: 'Archived', href: '/archived', count: counts.archived },
            { label: 'Trash', href: '/trash', count: counts.trash }
          ]}></Sidebar>
      }>
      <Outlet />
    </Page>
  )
}
