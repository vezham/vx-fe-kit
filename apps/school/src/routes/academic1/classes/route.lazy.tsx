import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic1/classes')({
  component: ClassesLayout
})

function ClassesLayout() {
  return <Outlet />
}
