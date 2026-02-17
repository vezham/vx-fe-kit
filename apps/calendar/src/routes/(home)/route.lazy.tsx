import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import Menu from '../../components/menu'
import Page from '../../components/menu/layout'
import Sidebar from '../../components/sidebar'

export const Route = createLazyFileRoute('/(home)')({
  component: HomeLayout
})

function HomeLayout() {
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
        { id: '4', label: 'Reminders', value: 'reminders' },
        { id: '5', label: 'Birthdays', value: 'birthdays' }
      ]
    }
  ]

  return (
    <Page
      header={[
        { icon: 'mdi:bell-outline', href: '/notifications' },
        { icon: 'mdi:cog-outline', href: '/settings' },
        { icon: 'mdi:account-group', href: '/teams' },
        { icon: 'mdi:upload', href: '/shared' },
        { icon: 'mdi:help-circle-outline', href: '/cta/help-support' }
      ]}
      calendarMenu={
        <Menu
          sections={calendarSections}
          selectedValues={visibleCalendars}
          onChange={setVisibleCalendars}
        />
      }
      sidebar={
        <Sidebar
          sidebar={[
            { label: 'Today', href: '/today' },
            { label: 'Week', href: '/week' },
            { label: 'Month', href: '/month' },
            { label: 'Year', href: '/year' },
            { label: 'Events', href: '/events' }
          ]}
        />
      }>
      <Outlet />
    </Page>
  )
}
