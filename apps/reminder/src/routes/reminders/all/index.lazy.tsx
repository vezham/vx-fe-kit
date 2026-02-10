import { createLazyFileRoute } from '@tanstack/react-router'

import AllSection from '../../../pages/reminders/all'

export const Route = createLazyFileRoute('/reminders/all/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <AllSection />
    </div>
  )
}
