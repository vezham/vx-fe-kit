import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

import { Reminder } from './store'

interface ReminderDetailProps {
  reminder: Reminder
  onBack: () => void
}

export function ReminderDetail({ reminder, onBack }: ReminderDetailProps) {
  return (
    <div className="mx-auto space-y-6 rounded-xl p-4">
      <div className="flex items-center space-x-4">
        <Button
          isIconOnly
          className="bg-content2"
          onClick={onBack}
          startContent={<Icon icon="mdi:chevron-left" />}
        />
        <h1 className="truncate text-2xl font-bold">{reminder.title}</h1>
      </div>

      <div className="space-y-2">
        {reminder.notes && (
          <p className="text-gray-700">
            <span className="font-semibold">Notes:</span> {reminder.notes}
          </p>
        )}
        {reminder.date && (
          <p className="text-gray-700">
            <span className="font-semibold">Date:</span> {reminder.date}
          </p>
        )}
        {reminder.time && (
          <p className="text-gray-700">
            <span className="font-semibold">Time:</span> {reminder.time}
          </p>
        )}
        <p className="text-gray-700">
          <span className="font-semibold">Completed:</span>{' '}
          {reminder.completed ? 'Yes' : 'No'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Flagged:</span>{' '}
          {reminder.flagged ? 'Yes' : 'No'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Archived:</span>{' '}
          {reminder.archived ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  )
}
