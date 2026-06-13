import { createLazyFileRoute } from '@tanstack/react-router'

import { TrackerPage } from '@/src/views/tracker-page'

export const Route = createLazyFileRoute('/tracker/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <TrackerPage />
    </div>
  )
}
