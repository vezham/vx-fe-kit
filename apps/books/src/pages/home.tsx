import React from 'react'
import { useTheme } from '../common/context'
import ControlSection from '../components/header/action'
import AvatarSection from '../components/header/avatar'
import Header from '../components/header/index'

const Home = () => {
  const tabsData = [
    {
      key: 'home',
      title: 'Home',
      content: React.createElement('div', null, 'Home Content')
    },
    {
      key: 'profile',
      title: 'Profile',
      content: React.createElement('div', null, 'Profile Content')
    },
    {
      key: 'appearance',
      title: 'Appearance',
      content: React.createElement('div', null, 'Appearance Content')
    },
    {
      key: 'contact',
      title: 'Contact',
      content: React.createElement('div', null, 'Contact Content')
    },
    {
      key: 'message',
      title: 'Message',
      content: React.createElement('div', null, 'Message Content')
    },
    {
      key: 'inventory',
      title: 'Inventory',
      content: React.createElement('div', null, 'Inventory Content')
    },
    {
      key: 'billing',
      title: 'Billing',
      content: React.createElement('div', null, 'Billing Content')
    },
    {
      key: 'account',
      title: 'Account',
      content: React.createElement('div', null, 'Account Content')
    },
    {
      key: 'admin',
      title: 'Admin',
      content: React.createElement('div', null, 'Admin Content')
    },
    {
      key: 'personal',
      title: 'Personal',
      content: React.createElement('div', null, 'Admin Content')
    }
  ]

  const initialAvatars = [
    { name: 'John', src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { name: 'Mark', src: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
    { name: 'Jane', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { name: 'Mark', src: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
    { name: 'Jane', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }
  ]

  const { isDarkMode } = useTheme()

  return (
    <Header
      tabs={tabsData}
      mainTitle="Home"
      mainDescription="Customize your profile and appearance."
      isDarkmode={isDarkMode}>
      {<AvatarSection avatars={initialAvatars} />}
      {<ControlSection />}
    </Header>
  )
}

export default Home
