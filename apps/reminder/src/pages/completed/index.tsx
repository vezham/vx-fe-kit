import React from 'react'

import ReminderList from '../reminders'

const CompleteSection = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Completed</h2>
      <ReminderList filter="completed" />
    </div>
  )
}

export default CompleteSection
