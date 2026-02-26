import React from 'react'

import { Surface } from '@vezham/react/v3'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Surface
      variant="secondary"
      data-vx="app-layout"
      className="flex w-full flex-col md:flex-row">
      <div className="flex min-h-screen min-w-0 flex-1 flex-col p-6">
        {children}
      </div>
    </Surface>
  )
}

export { AppLayout }
