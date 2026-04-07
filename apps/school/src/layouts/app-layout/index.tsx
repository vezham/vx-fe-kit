import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Surface
      variant="transparent"
      data-vx="app-layout"
      className="bg-background min-h-screen w-full md:flex">
      <MenuLayout />
      {children}
    </Surface>
  )
}

export { AppLayout }
