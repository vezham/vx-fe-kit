import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import { Page } from '../../../pages/projects'

export type ProjectRouteContext = {
  activeProject: any | null
}

export const Route = createLazyFileRoute('/projects/$projectId/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Page>
        <Outlet />
      </Page>
    </div>
  )
}
