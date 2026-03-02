'use client'

import { useNavigate, useSearch } from '@tanstack/react-router'
import React from 'react'

import { Surface } from '@vezham/react/v3'

import NewReminderDrawer from '../../pages/reminders/drawer'
import CreateListModal from '../../pages/reminders/modal'
import AppContainerHeader from '../app-container-header'
import MenuLayout from '../menu-layout'

type SearchParams = {
  drawer?: 'reminder' | 'list'
  id?: string
}

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as SearchParams

  const openReminderDrawer = () => {
    navigate({
      search: prev => ({
        ...prev,
        drawer: 'reminder'
      })
    })
  }

  const openListModal = () => {
    navigate({
      search: prev => ({
        ...prev,
        drawer: 'list'
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

  return (
    <>
      <Surface
        variant="tertiary"
        data-vx="app-layout"
        className="flex w-full flex-col md:flex-row">
        <MenuLayout />

        <div className="flex flex-1 flex-col">
          <AppContainerHeader
            showAdd
            onNewReminder={openReminderDrawer}
            onNewList={openListModal}
          />

          <div className="min-h-screen p-6">{children}</div>
        </div>
      </Surface>

      <NewReminderDrawer
        isOpen={search.drawer === 'reminder'}
        reminderId={search.id}
        onClose={closeAll}
      />

      <CreateListModal isOpen={search.drawer === 'list'} onClose={closeAll} />
    </>
  )
}

export { AppLayout }
