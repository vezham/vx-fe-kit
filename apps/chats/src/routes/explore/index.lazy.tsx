import { createLazyFileRoute } from '@tanstack/react-router'

import { ExplorePage } from '@/src/views/explore-page'

export const Route = createLazyFileRoute('/explore/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ExplorePage />
    </div>
  )
}
