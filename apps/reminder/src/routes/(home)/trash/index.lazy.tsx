import { createLazyFileRoute } from '@tanstack/react-router'

import ReminderList from '../../../pages/reminders'

export const Route = createLazyFileRoute('/(home)/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return <ReminderList filter="trash" />
}
