import React from 'react'

import { Surface } from '@vezham/react/v3'

import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Surface
      variant="secondary"
      data-vx="app-layout"
      className="flex w-full flex-col md:flex-row">
      <MenuLayout />

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </Surface>
  )
}

export { AppLayout }
