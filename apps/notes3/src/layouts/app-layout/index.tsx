import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import NoteModal from '../../pages/notes/createmodal'
import AppContainerHeader from '../app-container-header'
import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <Surface
      variant="tertiary"
      data-vx="app-layout"
      className="flex w-full flex-col md:flex-row">
      <MenuLayout />

      <div className="flex flex-1 flex-col">
        <AppContainerHeader showAdd onAdd={() => setOpenCreate(true)} />

        <div className="min-h-screen">{children}</div>
      </div>

      <NoteModal
        isOpen={openCreate}
        onOpenChange={setOpenCreate}
        editNote={null}
      />
    </Surface>
  )
}

export { AppLayout }
