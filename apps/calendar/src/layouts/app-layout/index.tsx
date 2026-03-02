import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Checkbox, CheckboxGroup } from '@vezham/react/v2'
import { Surface } from '@vezham/react/v3'

import Sidebar from '../../components/sidebar'
import NewCalendarReminderDrawer from '../../pages/calendar/drawer'
import NewEventModal from '../../pages/calendar/modal'
import AppContainerHeader from '../app-container-header'
import MenuLayout from '../menu-layout'

type SearchParams = {
  drawer?: 'reminder' | 'event'
  id?: string
}

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { location } = useRouterState()

  const pathname = location.pathname

  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as SearchParams

  const openCalendarDrawer = () => {
    navigate({
      search: prev => ({
        ...prev,
        drawer: 'reminder'
      })
    })
  }

  const openEventModal = () => {
    navigate({
      search: prev => ({
        ...prev,
        drawer: 'event'
      })
    })
  }

  const closeAll = () => {
    navigate({
      search: prev => {
        const { drawer, id, ...rest } = prev
        return rest
      }
    })
  }

  const hideSidebar =
    pathname.startsWith('/settings') ||
    pathname.startsWith('/notifications') ||
    pathname.startsWith('/teams') ||
    pathname.startsWith('/cta') ||
    pathname.startsWith('/shared')

  const [visibleCalendars, setVisibleCalendars] = useState<string[]>([
    'work',
    'holidays'
  ])

  const calendarSections = [
    {
      title: 'My Calendars',
      items: [
        { id: '1', label: 'Work', value: 'work' },
        { id: '2', label: 'Personal', value: 'personal' }
      ]
    },
    {
      title: 'Other',
      items: [
        { id: '3', label: 'Holidays', value: 'holidays' },
        { id: '4', label: 'Reminders', value: 'reminders' }
      ]
    }
  ]

  return (
    <Surface variant="tertiary" className="w-full md:flex">
      <MenuLayout />
      <div className="flex w-full">
        <div>
          {!hideSidebar && (
            <Sidebar>
              <div className="flex flex-col gap-6 p-2">
                {calendarSections.map(section => (
                  <div key={section.title} className="flex flex-col gap-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">
                      {section.title}
                    </h4>

                    <CheckboxGroup
                      value={visibleCalendars}
                      onValueChange={setVisibleCalendars}>
                      {section.items.map(item => (
                        <Checkbox key={item.id} value={item.value}>
                          {item.label}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>
                ))}
              </div>
            </Sidebar>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <AppContainerHeader
            showAdd
            onNewReminder={openCalendarDrawer}
            onNewList={openEventModal}
          />
          <div className="min-h-screen p-6">{children}</div>
        </div>
      </div>

      <NewCalendarReminderDrawer
        isOpen={search.drawer === 'reminder'}
        reminderId={search.id}
        onClose={closeAll}
      />

      <NewEventModal isOpen={search.drawer === 'event'} onClose={closeAll} />
    </Surface>
  )
}

export { AppLayout }
