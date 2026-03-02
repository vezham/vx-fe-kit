import { createLazyFileRoute } from '@tanstack/react-router'

import ReminderList from '../../pages/reminders'

export const Route = createLazyFileRoute('/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return <ReminderList filter="trash" />
}
