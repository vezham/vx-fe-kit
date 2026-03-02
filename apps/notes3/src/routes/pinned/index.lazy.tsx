import { createLazyFileRoute } from '@tanstack/react-router'

import PinnedPage from '../../pages/pinned'

export const Route = createLazyFileRoute('/pinned/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <PinnedPage />
    </div>
  )
}
