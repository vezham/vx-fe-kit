import { createLazyFileRoute } from '@tanstack/react-router'

import { EventSection } from '../../../pages/events'

export const Route = createLazyFileRoute('/(home)/events/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <EventSection />
    </div>
  )
}
