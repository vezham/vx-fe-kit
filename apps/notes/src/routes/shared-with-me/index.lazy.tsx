import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '../../pages/home'
import Home2 from '../../pages/home2'

export const Route = createLazyFileRoute('/shared-with-me/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      {/* <Home>
        <div>Home-overview</div>
      </Home> */}

      <Home2>
        <div>Home - Shared Notes</div>
      </Home2>
    </>
  )
}
