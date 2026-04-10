import { useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import Footer from '../../components/panel/footer'
import { AIDrawer } from '../../components/panel/footer/ai'
import { ControlCenterDrawer } from '../../components/panel/footer/control-center'
import { NotificationDrawer } from '../../components/panel/footer/notification-center'
import UserInfoModal from '../../components/panel/footer/preferences/modal'
import Header from '../../components/panel/header'
import { BookmarksDrawer } from '../../components/panel/header/bookmarks'
import { DiskDrawer } from '../../components/panel/header/disc'
import { Menu } from '../../components/panel/menu'
import { items } from '../../components/panel/menu/sidebar-items'
import { useUser } from '../../store/users/useUserStore'

export default function MenuMD() {
  const [selectedKey, setSelectedKey] = React.useState(items[0]?.key)
  const [openSettings, setOpenSettings] = useState(false)
  const navigate = useNavigate()
  const [aiOpen, setAIOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
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

  return (
    <Surface
      variant="transparent"
      className="border-default-300 sticky top-0 left-0 z-[50] flex h-screen w-[106px] flex-col gap-6 px-4 pt-4 pb-6"
      data-vx="menu-layout">
      {/* Top */}
      <Header
        users={users}
        showSearch
        showFavorites
        showArchive
        onBookMarksClick={() => setBookmarksOpen(true)}
        onDiskClick={() => setArchiveOpen(true)}
      />

      <Menu
        collapsed={false}
        items={items}
        selectedKey={selectedKey}
        onSelect={handleItemSelect}
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

      {/* Modals */}
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
      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
      />
      <DiskDrawer isOpen={archiveOpen} onClose={() => setArchiveOpen(false)} />
    </Surface>
  )
}
