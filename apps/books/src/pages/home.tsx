import React from 'react'
import { useTheme } from '../common/context'
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
    }
  ]

  const initialAvatars = [
    { name: 'John', src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { name: 'Mark', src: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
    { name: 'Jane', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }
  ]

  const { isDarkMode } = useTheme()

  return (
    <Header
      tabs={tabsData}
      avatars={initialAvatars}
      mainTitle="Home"
      mainDescription="Customize your profile and appearance."
      isDarkmode={isDarkMode}
    />
  )
}

export default Home
