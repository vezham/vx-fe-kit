import { useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import { BottomNavbar } from '../../components/menu'
import { longMenuItems } from '../../components/menu/sidebar-items'
import Footer from '../../components/panel/footer'
import AIDrawer from '../../components/panel/footer/ai/drawer'
import ControlCenterDrawer from '../../components/panel/footer/control-center/drawer'
import NotificationDrawer from '../../components/panel/footer/notification-center/drawer'
import UserInfoModal from '../../components/panel/footer/preferences/modal'
import Header from '../../components/panel/header'
import FavoritesDrawer from '../../components/panel/header/bookmarks/drawer'
import ArchiveDrawer from '../../components/panel/header/disk/drawer'
import { useUser } from '../../store/users/useUserStore'

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

  const users = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
  }

  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <Surface variant="transparent" className={`flex flex-1 flex-col`}>
      <div className={`sticky top-0 z-50 flex justify-between p-3 shadow-md`}>
        <Header
          users={users}
          showSearch
          showFavorites
          showArchive
          onAvatarClick={user => console.log('Avatar clicked:', user)}
          onSearchClick={() => console.log('Search clicked')}
          onFavoritesClick={() => setFavoritesOpen(true)}
          onArchiveClick={() => setArchiveOpen(true)}
        />
        <Footer
          user={{
            id: user?.id ?? '',
            name: user
              ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
              : '',
            avatar: user?.avatar,
            isOnline: user?.isOnline
          }}
          showAI
          showControlCenter
          showNotifications
          showUserInfo
          onAI={() => setAIOpen(true)}
          onControlCenterClick={() => setControlsOpen(true)}
          onNotificationsClick={() => setNotificationsOpen(true)}
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
          items={longMenuItems}
          selectedKey={selectedKey}
          onSelect={handleItemSelect}
        />
      </div>
    </Surface>
  )
}
