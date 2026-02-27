import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/teams')({
  component: TeamComponent
})

function TeamComponent() {
  return (
    <div className="p-6">
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Teams</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/teams/overview', 'Overview', true],
            ['/teams/members', 'Members'],
            ['/teams/permissions', 'Permissions'],
            ['/teams/roles', 'Roles']
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
