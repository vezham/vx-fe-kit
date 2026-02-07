import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '../../pages/home'
import Home2 from '../../pages/home2'

export const Route = createLazyFileRoute('/pinned-notes/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      {/* <Home>
        <div>Home-overview</div>
      </Home> */}

      <Home2>
        <div>Home - Pinned Notes</div>
      </Home2>
    </>
  )
}
