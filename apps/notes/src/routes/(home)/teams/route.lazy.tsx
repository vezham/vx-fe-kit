import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/teams')({
  component: SettingsComponent
})

function SettingsComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Teams</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/teams/overview', 'Overview', true],
            ['/teams/members', 'Members'],
            ['/teams/roles', 'Roles'],
            ['/teams/permissions', 'Permissions']
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
