import ReminderList from '../reminders'

const AllSection = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">All</h2>
      <ReminderList filter="all" />
    </div>
  )
}

export default AllSection
