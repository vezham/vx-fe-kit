import { Icon } from '@iconify/react'
import {
  Link,
  Outlet,
  createLazyFileRoute,
  useNavigate
} from '@tanstack/react-router'

import { Button } from '@vezham/react/v2'

export const Route = createLazyFileRoute('/(home)/settings')({
  component: SettingsComponent
})

function SettingsComponent() {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex items-center gap-4 border-b">
        <Button
          isIconOnly
          onClick={() => navigate({ to: '/', replace: true })}
          startContent={<Icon icon="mdi:chevron-left" />}></Button>
        <h2 className="text-xl">Settings</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/settings/workspace', 'Workspace', true],
            ['/settings/notifications', 'Notifications'],
            ['/settings/billing', 'Billing'],
            ['/settings/automations', 'Automations'],
            ['/settings/security', 'Security & SSO'],
            ['/settings/users', 'Users & Roles']
          ] as const
        ).map(([to, label, exact]) => {
          return (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: `font-bold` }}
              className="p-2">
              {label}
            </Link>
          )
        })}
      </div>
      <hr />
      <Outlet />
    </>
  )
}
