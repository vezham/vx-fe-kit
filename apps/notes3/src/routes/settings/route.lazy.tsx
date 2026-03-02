import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings')({
  component: SettingsComponent
})

function SettingsComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Settings</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/settings/workspace', 'Workspace', true],
            ['/settings/billing', 'Billing'],
            ['/settings/automations', 'Automations'],
            ['/settings/security', 'Security & SSO'],
            ['/settings/timezone', 'Timezone'],
            ['/settings/integrations', 'Integrations']
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
