import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/contacts/shared')({
  component: SharedComponent
})

function SharedComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Shared Contacts</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/contacts/shared/shared-by-me', 'Shared-By-Me', true],
            ['/contacts/shared/shared-with-me', 'Shared-with-me']
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
