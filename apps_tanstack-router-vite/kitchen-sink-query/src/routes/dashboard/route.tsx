import { createFileRoute } from '@tanstack/react-router'
import { Link, Outlet } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent
})

function DashboardComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Dashboard</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/dashboard', 'Summary', true],
            ['/dashboard/invoices', 'Invoices'],
            ['/dashboard/users', 'Users']
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
