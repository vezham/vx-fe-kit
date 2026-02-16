import {
  createLazyFileRoute,
  useNavigate,
  useParams
} from '@tanstack/react-router'

import { ReminderDetail } from '../../../../pages/reminders/detail'
import { useReminders } from '../../../../pages/reminders/store'

export const Route = createLazyFileRoute('/(home)/reminder/$reminderId/')({
  component: ReminderDetailPage
})

function ReminderDetailPage() {
  const navigate = useNavigate()
  const { reminderId } = useParams({ strict: false })
  const { reminders } = useReminders()

  const reminder = reminders.find(r => r.id.toString() === reminderId)

  if (!reminder) return <div>Reminder not found</div>

  const handleBack = () => navigate({ to: '/all', replace: true })

  return <ReminderDetail reminder={reminder} onBack={handleBack} />
}
