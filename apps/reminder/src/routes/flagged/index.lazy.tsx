import { createLazyFileRoute } from '@tanstack/react-router'

import FlagSection from '../../pages/flagged'

export const Route = createLazyFileRoute('/flagged/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <FlagSection />
    </div>
  )
}
