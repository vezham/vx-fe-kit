import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import AppContainerHeader from '../../layouts/app-container-header'

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const settingsTabs = [
    { key: 'company', title: 'Company', to: '/settings/company' },
    { key: 'account', title: 'Account', to: '/settings/account' },
    { key: 'team', title: 'Team', to: '/settings/team' },
    {
      key: 'notifications',
      title: 'Notifications',
      to: '/settings/notifications'
    },
    { key: 'integrations', title: 'Integrations', to: '/settings/integrations' }
  ]

  const selected =
    settingsTabs.find(tab => location.pathname.startsWith(tab.to))?.key ??
    'company'

  const handleTabChange = (key: string) => {
    const tab = settingsTabs.find(t => t.key === key)
    if (!tab) return

    navigate({ to: tab.to })
  }

  return (
    <div className="flex h-screen w-full flex-col p-4">
      <Surface variant="transparent" className="p-3">
        <AppContainerHeader
          tabs={settingsTabs}
          selectedKey={selected}
          onTabChange={handleTabChange}
          showAdd
          showMore
          showSearch
        />
      </Surface>

      <div className="flex flex-1 overflow-hidden">
        <Surface className="flex-1 overflow-auto rounded-xl p-4">
          <Outlet />
        </Surface>
      </div>
    </div>
  )
}
