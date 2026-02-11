import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Notes</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/notes/all', 'All', true],
            ['/notes/pinned', 'Pinned'],
            ['/notes/shared', 'Shared'],
            ['/notes/folders', 'Folders'],
            ['/notes/trash', 'Trash']
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
