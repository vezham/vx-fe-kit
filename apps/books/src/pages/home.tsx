import React from 'react'
import Header from '../components/header/index'

const home = () => {
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

  return (
    <div>
      <Header
        tabs={tabsData}
        avatars={initialAvatars}
        mainTitle="Home"
        mainDescription="Customize your profile and appearance."
      />
    </div>
  )
}

export default home
