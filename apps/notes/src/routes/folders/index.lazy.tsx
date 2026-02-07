import { createLazyFileRoute } from '@tanstack/react-router'

import Home2 from '../../pages/home2'
import Sidebar from '../../pages/sidebar'

export const Route = createLazyFileRoute('/folders/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Home2>
        <Sidebar />
      </Home2>
    </div>
  )
}
