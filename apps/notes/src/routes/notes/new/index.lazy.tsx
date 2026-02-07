import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../../pages/home2'
import Sidebar from '../../../pages/sidebar'

export const Route = createLazyFileRoute('/notes/new/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Home2>
      <Sidebar>
        <div>Create new note</div>
      </Sidebar>
    </Home2>
  )
}
