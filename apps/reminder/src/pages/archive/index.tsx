import React from 'react'

import ReminderList from '../reminders'

const Archive = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Archive</h2>
      <ReminderList filter="archive" />
    </div>
  )
}

export default Archive
