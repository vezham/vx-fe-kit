import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'

import { Surface } from '@vezham/react-v3'

import Footer from '../../components/panel/footer'
import { aiPanel } from '../../components/panel/footer/ai'
import { ControlCenterDrawer } from '../../components/panel/footer/control-center'
import { NotificationDrawer } from '../../components/panel/footer/notification-center'
import UserInfoModal from '../../components/panel/footer/preferences/modal'
import Header from '../../components/panel/header'
import { bookmarksPanel } from '../../components/panel/header/bookmarks'
import { discPanel } from '../../components/panel/header/disc'
import {
  InfoPanelContainer,
  useInfoPanel
} from '../../components/panel/info-panel'
import { Menu } from '../../components/panel/menu'
import { items } from '../../components/panel/menu/sidebar-items'
import { useUser } from '../../store/users/useUserStore'

export default function MenuMD() {
  const [openSettings, setOpenSettings] = useState(false)
  const location = useLocation()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const { openInfoPanel } = useInfoPanel()

  const selectedKey = getSelectedMenuKey(location.pathname)

  const users = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
  }

  const { user } = useUser()

  return (
    <>
      <Surface
        variant="transparent"
        className="border-default-300 sticky top-0 left-0 z-[10] flex h-screen w-[106px] flex-col gap-6 px-4 pt-4 pb-6"
        data-vx="menu-layout">
        <Header users={users} showSearch showBookamarks showDisk />

        <Menu collapsed={false} items={items} selectedKey={selectedKey} />

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
          onAI={() => openInfoPanel('ai')}
          onControlCenterClick={() => setControlsOpen(true)}
          onNotificationsClick={() => setNotificationsOpen(true)}
          onUserClick={() => setOpenSettings(true)}
        />
      </Surface>
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
      <InfoPanelContainer
        panels={{
          bookmarks: bookmarksPanel,
          disc: discPanel,
          ai: aiPanel
        }}
      />
    </>
  )
}

function getSelectedMenuKey(pathname: string) {
  const activeItem = items
    .flatMap(item => [item, ...(item.submenu ?? [])])
    .filter(
      item =>
        item.href &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`))
    )
    .sort((a, b) => (b.href?.length ?? 0) - (a.href?.length ?? 0))[0]

  const parentItem = items.find(
    item =>
      item.key === activeItem?.key ||
      item.submenu?.some(subItem => subItem.key === activeItem?.key)
  )

  return parentItem?.key ?? items[0]?.key
}
