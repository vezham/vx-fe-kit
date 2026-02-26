import React from 'react'

import { Surface } from '@vezham/react/v3'

import Footer from '../../components/panel/footer'
import Header from '../../components/panel/header'
import { Menu } from '../../components/panel/menu'
import { items } from '../../components/panel/menu/sidebar-items'

export default function MenuMD() {
  const [selectedKey, setSelectedKey] = React.useState(items[0]?.key)

  const handleItemSelect = (key: string) => {
    setSelectedKey(key)
  }

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
      'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=3229',
    isOnline: true
  }

  return (
    <Surface
      variant="transparent"
      className={`border-default-300 flex h-screen w-[106px] flex-col gap-6 border-r px-4 pt-4 pb-6`}
      data-vx="menu-layout">
      <Header user={user} showSearch showFavorites showArchive />
      <Menu
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
      />
    </Surface>
  )
}
