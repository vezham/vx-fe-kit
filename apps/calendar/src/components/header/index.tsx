// import { Icon } from '@iconify/react'
// import { useMatchRoute, useNavigate } from '@tanstack/react-router'
// import React from 'react'
// import { useState } from 'react'
// import { Button } from '@vezham/react/v2'
// import type { HeaderProps } from './types'
// const Header: React.FC<HeaderProps> = ({ header }) => {
//   const [open, setOpen] = useState(false)
//   const navigate = useNavigate()
//   const matchRoute = useMatchRoute()
//   if (!header || header.length === 0) return null
//   return (
//     <div className="border-default-100 flex items-center justify-end gap-3 border-b px-6 py-4">
//       <Button size="sm" isIconOnly onPress={() => setOpen(true)}>
//         <Icon icon="mdi:plus" width={22} />
//       </Button>
//       <div className="flex gap-3">
//         {header.map(item => {
//           const isActive = Boolean(matchRoute({ to: item.href, fuzzy: true }))
//           return (
//             <Button
//               key={item.href}
//               isIconOnly
//               size="sm"
//               variant="light"
//               onClick={() => navigate({ to: item.href })}
//               className={isActive ? 'bg-primary text-white' : ''}>
//               <Icon icon={item.icon} width={20} />
//             </Button>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
// export default Header
import { Icon } from '@iconify/react'
import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@vezham/react/v2'

import NewCalendarReminderDrawer from '../../pages/calendar/drawer'
import NewEventModal from '../../pages/calendar/modal'
import type { HeaderProps } from './types'

const Header: React.FC<HeaderProps> = ({ header }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [eventOpen, setEventOpen] = useState(false)
  const [reminderOpen, setReminderOpen] = useState(false)

  const navigate = useNavigate()
  const matchRoute = useMatchRoute()

  if (!header || header.length === 0) return null

  return (
    <>
      <div className="border-default-100 flex items-center justify-end gap-3 border-b px-6 py-4">
        {/* PLUS BUTTON */}
        <Popover isOpen={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger>
            <Button size="sm" isIconOnly>
              <Icon icon="mdi:plus" width={22} />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-40 p-2">
            <div className="flex flex-col gap-2">
              <Button
                variant="light"
                onPress={() => {
                  setPopoverOpen(false)
                  setEventOpen(true)
                }}>
                New Event
              </Button>

              <Button
                variant="light"
                onPress={() => {
                  setPopoverOpen(false)
                  setReminderOpen(true)
                }}>
                New Reminder
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex gap-3">
          {header.map(item => {
            const isActive = Boolean(matchRoute({ to: item.href, fuzzy: true }))
            return (
              <Button
                key={item.href}
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => navigate({ to: item.href })}
                className={isActive ? 'bg-primary text-white' : ''}>
                <Icon icon={item.icon} width={20} />
              </Button>
            )
          })}
        </div>
      </div>

      <NewEventModal isOpen={eventOpen} onClose={() => setEventOpen(false)} />

      <NewCalendarReminderDrawer
        isOpen={reminderOpen}
        onClose={() => setReminderOpen(false)}
      />
    </>
  )
}

export default Header
