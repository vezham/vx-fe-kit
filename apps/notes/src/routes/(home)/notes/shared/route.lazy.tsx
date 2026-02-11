import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/shared')({
  component: SettingsComponent
})

function SettingsComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Shared Notes</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/notes/shared/shared-by-me', 'Shared By Me', true],
            ['/notes/shared/shared-with-me', 'Shared With Me']
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
