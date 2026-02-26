import React from 'react'

import { Surface } from '@vezham/react/v3'

import { useTheme } from '../../common/context'
import { BottomNavbar } from '../../components/menu'
import { longMenuItems } from '../../components/menu/sidebar-items'
import Footer from '../../components/panel/footer'
import Header from '../../components/panel/header'

export default function MenuSM() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isCompact, setIsCompact] = React.useState(true)
  const [isRightSidebar, setIsRightSidebar] = React.useState(false)
  const [isRtl, setIsRtl] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState('home')
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const menuItemsForBottomNavbar = longMenuItems

  const toggleDirection = () => setIsRightSidebar(prev => !prev)
  const toggleTextDirection = () => setIsRtl(prev => !prev)

  const toggleVisibility = () => {
    setIsCompact(prev => {
      if (!prev) setIsPopoverOpen(false)
      return !prev
    })
  }

  const handleSlackClick = React.useCallback(() => {
    if (isCompact) {
      setIsCompact(false)
      setIsPopoverOpen(false)
    } else {
      setIsPopoverOpen(open => !open)
    }
  }, [isCompact])

  const textColorClass = isDarkMode ? 'text-white' : 'text-black'
  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white'
  const bgSidebarClass = isDarkMode
    ? 'bg-neutral-800 shadow'
    : 'bg-default-100 shadow-sm'
  const scrollShadowBg = isDarkMode ? 'bg-neutral-900' : 'bg-white'
  const buttonTextColor = isDarkMode ? 'text-white' : 'text-black'

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

  return (
    <Surface
      variant="transparent"
      className={`${bgColorClass} ${textColorClass} flex flex-1 flex-col`}>
      <div
        className={`sticky top-0 z-50 flex justify-between p-3 shadow-md ${bgSidebarClass} ${textColorClass}`}>
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
          showAI
          showControlCenter
          showNotifications
          showUserInfo
          notificationCount={4}
          onAIClick={() => console.log('AI clicked')}
          onControlCenterClick={() => console.log('Control center clicked')}
          onNotificationsClick={() => console.log('Notifications clicked')}
          onUserClick={user => console.log('User clicked:', user)}
        />
      </div>

      <div className="sticky bottom-0">
        <BottomNavbar
          items={menuItemsForBottomNavbar}
          isDarkMode={isDarkMode}
          buttonTextColor={buttonTextColor}
          textColorClass={textColorClass}
          onSelect={setActiveKey}
          selectedKey={activeKey}
        />
      </div>
    </Surface>
  )
}
