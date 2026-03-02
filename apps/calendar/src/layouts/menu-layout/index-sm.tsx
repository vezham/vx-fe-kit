import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { Surface } from '@vezham/react/v3'

import { BottomNavbar } from '../../components/menu'
import { longMenuItems } from '../../components/menu/sidebar-items'
import Footer from '../../components/panel/footer'
import Header from '../../components/panel/header'

export default function MenuSM() {
  const menuItemsForBottomNavbar = longMenuItems

  const user = {
    id: '1',
    name: 'Slack',
    avatar:
      'https://toppng.com/uploads/preview/slack-new-logo-icon-11609376883z32jbkf8kg.png'
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
    <Surface variant="transparent" className="flex flex-1 flex-col">
      <div className="sticky top-0 z-50 flex justify-between p-3 shadow-md">
        <Header
          user={user}
          showSearch
          showFavorites
          showArchive
          onAvatarClick={user => console.log('Avatar clicked:', user)}
          onSearchClick={() => console.log('Search clicked')}
          onFavoritesClick={() => console.log('Favorites clicked')}
          onArchiveClick={() => console.log('Archive clicked')}
        />

        <Footer
          user={users}
          onCTA={() => navigate({ to: '/cta' })}
          onControlCenterClick={() => navigate({ to: '/settings' })}
          onNotificationsClick={() => navigate({ to: '/notifications' })}
          showCTA
          showControlCenter
          showNotifications
          showUserInfo
        />
      </div>

      <div className="sticky bottom-0">
        <BottomNavbar items={menuItemsForBottomNavbar} />
      </div>
    </Surface>
  )
}
