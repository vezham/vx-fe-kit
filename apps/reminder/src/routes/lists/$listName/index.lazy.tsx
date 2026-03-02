import { createLazyFileRoute, useParams } from '@tanstack/react-router'

import ReminderList from '../../../pages/reminders'

export const Route = createLazyFileRoute('/lists/$listName/')({
  component: ListRemindersPage
})

function ListRemindersPage() {
  const { listName } = useParams({ strict: false })

  return <ReminderList listName={listName} />
}
