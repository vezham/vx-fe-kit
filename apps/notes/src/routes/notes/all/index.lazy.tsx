import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../../pages/home2'
import Sidebar from '../../../pages/sidebar'

export const Route = createLazyFileRoute('/notes/all/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Home2>
      <Sidebar>
        <div>Show all Notes</div>
      </Sidebar>
    </Home2>
  )
}
