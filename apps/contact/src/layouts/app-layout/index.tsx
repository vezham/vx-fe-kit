import { useMatchRoute, useRouterState } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import Sidebar from '../../components/sidebar'
import ContactList from '../../pages/contact'
import { ContactDrawer } from '../../pages/contact/drawer'
import FavoritesList from '../../pages/favorites'
import GroupsList from '../../pages/groups'
import AppContainerHeader from '../app-container-header'
import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const matchRoute = useMatchRoute()
  const { location } = useRouterState()
  const isSettings = matchRoute({ to: '/settings', fuzzy: true })
  const isNotifications = matchRoute({ to: '/notifications', fuzzy: true })
  const isTeams = matchRoute({ to: '/teams', fuzzy: true })
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })
  const isShared = Boolean(matchRoute({ to: '/shared', fuzzy: true }))
  const isImport = Boolean(matchRoute({ to: '/import-export', fuzzy: true }))

  const hideChild =
    isImport || isShared || isSettings || isNotifications || isTeams || isCTA

  let sidebarChild = null
  if (!hideChild) {
    if (location.pathname === '/favorites') {
      sidebarChild = <FavoritesList />
    } else if (location.pathname === '/groups') {
      sidebarChild = <GroupsList />
    } else {
      sidebarChild = <ContactList />
    }
  }
  return (
    <Surface
      variant="tertiary"
      data-vx="app-layout"
      className="flex w-full flex-col md:flex-row">
      <MenuLayout />
      {sidebarChild && <Sidebar>{sidebarChild}</Sidebar>}

      <div className="flex flex-1 flex-col">
        <AppContainerHeader showAdd onAdd={() => setIsDrawerOpen(true)} />
        <ContactDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
        <div className="min-h-screen">{children}</div>
      </div>
    </Surface>
  )
}

export { AppLayout }
