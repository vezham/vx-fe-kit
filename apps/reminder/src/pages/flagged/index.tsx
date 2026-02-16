import ReminderList from '../reminders'

const FlagSection = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Flagged</h2>
      <ReminderList filter="flagged" />
    </div>
  )
}

export default FlagSection
