import React from 'react'
import { useTheme } from '../common/context'
import Header from '../components/header/index'

const Dashboard = () => {
  const { isDarkMode } = useTheme()

  const tabsData = [
    {
      key: 'overview',
      title: 'Overview',
      content: React.createElement('div', null, 'Overview Content')
    },
    {
      key: 'order',
      title: 'Order',
      content: React.createElement('div', null, 'Order Content')
    },
    {
      key: 'sales',
      title: 'Sales',
      content: React.createElement('div', null, 'Sales Content')
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
        mainTitle="Dashboard"
        mainDescription="Manage your deployments."
        isDarkmode={isDarkMode}
      />
    </div>
  )
}

export default Dashboard
