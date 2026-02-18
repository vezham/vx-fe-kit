import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/_pathlessLayout')({
  component: LayoutComponent
})

function LayoutComponent() {
  return (
    <div>
      <div>Layout</div>
      <hr />
      <Outlet />
    </div>
  )
}
