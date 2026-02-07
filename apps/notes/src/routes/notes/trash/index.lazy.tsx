import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../../pages/home2'
import Sidebar from '../../../pages/sidebar'

export const Route = createLazyFileRoute('/notes/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Home2>
      <Sidebar>
        <div>Trash</div>
      </Sidebar>
    </Home2>
  )
}
