import { createLazyFileRoute } from '@tanstack/react-router'

import { ExplorePage } from '@/src/pages/explore'

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
