import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../../../pages/home2'
import Sidebar from '../../../../pages/sidebar'

export const Route = createLazyFileRoute('/notes/$notesId/comments/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Home2>
      <Sidebar>
        <div>Single userid Comments</div>
      </Sidebar>
    </Home2>
  )
}
