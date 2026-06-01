import React, { useState } from 'react'

import { Surface } from '@vezham/react-v3'

import { BottomNavbar } from '../../components/menu'
import { longMenuItems } from '../../components/menu/sidebar-items'
import Footer from '../../components/panel/footer'
import { aiPanel } from '../../components/panel/footer/ai'
import { ControlCenterDrawer } from '../../components/panel/footer/control-center'
import { NotificationDrawer } from '../../components/panel/footer/notification-center'
import UserInfoModal from '../../components/panel/footer/preferences/modal'
import Header from '../../components/panel/header'
import { BookmarksDrawer } from '../../components/panel/header/bookmarks'
import {
  Bookmarks1Trigger,
  bookmarks1Panel
} from '../../components/panel/header/bookmarks1'
import { DiskDrawer } from '../../components/panel/header/disc'
import { Disc1Trigger, disc1Panel } from '../../components/panel/header/disc1'
import {
  InfoPanelContainer,
  useInfoPanel
} from '../../components/panel/info-panel'
import { useUser } from '../../store/users/useUserStore'

export default function MenuSM() {
  const [selectedKey, setSelectedKey] = React.useState(longMenuItems[0]?.key)
  const [openSettings, setOpenSettings] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
  const [diskOpen, setDiskOpen] = useState(false)
  const { openInfoPanel } = useInfoPanel()

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
    <Surface variant="transparent" className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 w-full shadow-md">
        <div className="flex w-full items-center justify-between px-3 py-2">
          <Header
            className="flex-shrink-0"
            users={users}
            showSearch
            showBookamarks
            showDisk
            onAvatarClick={user => console.log('Avatar clicked:', user)}
            onSearchClick={() => console.log('Search clicked')}
            onBookMarksClick={() => setBookmarksOpen(true)}
            onDiskClick={() => setDiskOpen(true)}
            extraActions={
              <>
                <Bookmarks1Trigger />
                <Disc1Trigger />
              </>
            }
          />

          <Footer
            className="ml-auto flex-shrink-0"
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
            onAI={() => openInfoPanel('ai')}
            onControlCenterClick={() => setControlsOpen(true)}
            onNotificationsClick={() => setNotificationsOpen(true)}
            onUserClick={() => setOpenSettings(true)}
          />
        </div>

        <UserInfoModal
          open={openSettings}
          onClose={() => setOpenSettings(false)}
        />
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
        <DiskDrawer isOpen={diskOpen} onClose={() => setDiskOpen(false)} />
      </div>

      <InfoPanelContainer
        panels={{
          bookmarks1: bookmarks1Panel,
          disc1: disc1Panel,
          ai: aiPanel
        }}
      />

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
