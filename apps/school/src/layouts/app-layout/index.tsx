import React from 'react'

import { Surface } from '@vezham/react-v3'

import { CommandProvider } from '../../components/command'
import { InfoPanelProvider } from '../../components/panel/info-panel'
import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommandProvider>
      <InfoPanelProvider>
        <Surface
          variant="transparent"
          data-vx="app-layout"
          className="bg-background min-h-screen w-full md:flex">
          <MenuLayout />
          <main className="min-w-0 flex-1 transition-[width,transform] duration-300 ease-out">
            {children}
          </main>
        </Surface>
      </InfoPanelProvider>
    </CommandProvider>
  )
}

export { AppLayout }
