import { useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import { BottomNavbar } from '../../components/menu'
import { longMenuItems } from '../../components/menu/sidebar-items'
import Footer from '../../components/panel/footer'
import AIDrawer from '../../components/panel/footer/ai/drawer'
import ControlCenterDrawer from '../../components/panel/footer/control-center/drawer'
import UserInfoModal from '../../components/panel/footer/modal'
import NotificationDrawer from '../../components/panel/footer/notification/drawer'
import Header from '../../components/panel/header'
import ArchiveDrawer from '../../components/panel/header/archived/drawer'
import FavoritesDrawer from '../../components/panel/header/favorites/drawer'

export default function MenuSM() {
  const [selectedKey, setSelectedKey] = React.useState(longMenuItems[0]?.key)
  const [openSettings, setOpenSettings] = useState(false)
  const [aiOpen, setAIOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)

  const handleItemSelect = (key: string) => {
    setSelectedKey(key)
  }

  const menuItemsForBottomNavbar = longMenuItems

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
      'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369990.png',
    isOnline: true
  }

  const navigate = useNavigate()

  return (
    <Surface variant="transparent" className={`flex flex-1 flex-col`}>
      <div className={`sticky top-0 z-50 flex justify-between p-3 shadow-md`}>
        <Header
          user={user}
          showSearch
          showFavorites
          showArchive
          onAvatarClick={user => console.log('Avatar clicked:', user)}
          onSearchClick={() => console.log('Search clicked')}
          onFavoritesClick={() => setFavoritesOpen(true)}
          onArchiveClick={() => setArchiveOpen(true)}
        />
        <Footer
          user={users}
          onAI={() => setAIOpen(true)}
          onControlCenterClick={() => setControlsOpen(true)}
          onNotificationsClick={() => setNotificationsOpen(true)}
          showAI
          showControlCenter
          showNotifications
          showUserInfo
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
      </div>
      <div>
        <BottomNavbar
          items={menuItemsForBottomNavbar}
          selectedKey={selectedKey}
          onSelect={handleItemSelect}
        />
      </div>
    </Surface>
  )
}
