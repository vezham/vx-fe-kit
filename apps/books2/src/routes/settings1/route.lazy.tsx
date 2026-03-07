import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings1')({
  component: SettingsComponent
})

function SettingsComponent() {
  return (
    <div className="flex-col">
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Settings</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/settings1/workspace', 'Workspace', true],
            ['/settings1/billing', 'Billing'],
            ['/settings1/automations', 'Automations'],
            ['/settings1/security', 'Security & SSO'],
            ['/settings1/integrations', 'Integrations']
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
    </div>
  )
}
