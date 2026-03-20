import { useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import Footer from '../../components/panel/footer'
import AIDrawer from '../../components/panel/footer/ai/drawer'
import ControlCenterDrawer from '../../components/panel/footer/control-center/drawer'
import UserInfoModal from '../../components/panel/footer/modal'
import NotificationDrawer from '../../components/panel/footer/notification/drawer'
import Header from '../../components/panel/header'
import ArchiveDrawer from '../../components/panel/header/archived/drawer'
import FavoritesDrawer from '../../components/panel/header/favorites/drawer'
import { Menu } from '../../components/panel/menu'
import { items } from '../../components/panel/menu/sidebar-items'

export default function MenuMD() {
  const [selectedKey, setSelectedKey] = React.useState(items[0]?.key)
  const [openSettings, setOpenSettings] = useState(false)
  const navigate = useNavigate()
  const [aiOpen, setAIOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)

  const handleItemSelect = (key: string) => {
    setSelectedKey(key)
  }

  const user = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
  }

  const users = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=3229',
    isOnline: true
  }

  return (
    <Surface
      variant="transparent"
      className="border-default-300 flex h-screen w-[106px] flex-col gap-6 px-4 pt-4 pb-6"
      data-vx="menu-layout">
      <Header
        user={user}
        showSearch
        showFavorites
        showArchive
        onFavoritesClick={() => setFavoritesOpen(true)}
        onArchiveClick={() => setArchiveOpen(true)}
      />
      <Menu
        collapsed={false}
        items={items}
        selectedKey={selectedKey}
        onSelect={handleItemSelect}
      />
      <Footer
        user={users}
        showAI
        showControlCenter
        showNotifications
        showUserInfo
        onAI={() => setAIOpen(true)}
        onControlCenterClick={() => setControlsOpen(true)}
        onNotificationsClick={() => setNotificationsOpen(true)}
        // onAI={() => navigate({ to: '/cta/help-support' })}
        // onNotificationsClick={() => navigate({ to: '/notifications' })}
        onUserClick={() => setOpenSettings(true)}
      />
      <UserInfoModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
      <AIDrawer isOpen={aiOpen} onClose={() => setAIOpen(false)} />
      <ControlCenterDrawer
        isOpen={controlsOpen}
        onClose={() => setControlsOpen(false)}
      />
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <FavoritesDrawer
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />

      <ArchiveDrawer
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
      />
    </Surface>
  )
}
