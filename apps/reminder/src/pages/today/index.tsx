import ReminderList from '../reminders'

const TodaySection = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Today</h2>
      <ReminderList filter="today" />
    </div>
  )
}

export default TodaySection
