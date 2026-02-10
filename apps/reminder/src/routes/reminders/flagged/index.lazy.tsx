import { createLazyFileRoute } from '@tanstack/react-router'

import FlagSection from '../../../pages/reminders/flagged'

export const Route = createLazyFileRoute('/reminders/flagged/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <FlagSection />
    </div>
  )
}
