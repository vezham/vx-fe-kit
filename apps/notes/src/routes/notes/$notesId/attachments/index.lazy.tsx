import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../../../pages/home2'
import Sidebar from '../../../../pages/sidebar'

export const Route = createLazyFileRoute('/notes/$notesId/attachments/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Home2>
      <Sidebar>
        <div>Single userid Attachments</div>
      </Sidebar>
    </Home2>
  )
}
