import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import BankSidebar from '../../pages/banks/sidebar'
import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(true)

  const navigate = useNavigate()
  const matchRoute = useMatchRoute()

  const isSettings = matchRoute({ to: '/settings', fuzzy: true })
  const isNotifications = matchRoute({ to: '/notifications', fuzzy: true })
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })

  const hideChild = isSettings || isNotifications || isCTA

  const isBankRoute = matchRoute({ to: '/bank', fuzzy: true })

  const handleClick = (accountsId: string) => {
    setShowSidebarMobile(false)

    navigate({
      to: '/bank/accounts/$accountsId/overview',
      params: { accountsId }
    })
  }

  let sidebarChild: React.ReactNode = null

  if (!hideChild && isBankRoute) {
    sidebarChild = <BankSidebar onItemClick={handleClick} />
  }

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
