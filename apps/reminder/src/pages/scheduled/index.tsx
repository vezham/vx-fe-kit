import ReminderList from '../reminders'

const ScheduleSection = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Scheduled</h2>
      <ReminderList filter="scheduled" />
    </div>
  )
}

export default ScheduleSection
