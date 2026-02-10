import { createLazyFileRoute } from '@tanstack/react-router'

import TodaySection from '../../../pages/reminders/today'

export const Route = createLazyFileRoute('/reminders/today/')({
  component: RouteComponent
})

function RouteComponent() {
  return <TodaySection />
}
