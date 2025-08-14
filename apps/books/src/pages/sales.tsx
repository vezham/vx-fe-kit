import React from 'react'
import { useTheme } from '../common/context'
import Header from '../components/header/index'

const Sales = () => {
  const { isDarkMode } = useTheme()

  const tabsData = [
    {
      key: 'sales',
      title: 'Sales',
      content: React.createElement('div', null, 'Sales Content')
    },
    {
      key: 'stocks',
      title: 'Stocks',
      content: React.createElement('div', null, 'Stocks Content')
    },
    {
      key: 'exchange',
      title: 'Exchange',
      content: React.createElement('div', null, 'Exchange Content')
    },
    {
      key: 'offers',
      title: 'Offers',
      content: React.createElement('div', null, 'Offers Content')
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
        mainTitle="Sales"
        mainDescription="Track your sales and stocks."
        isDarkmode={isDarkMode}
      />
    </div>
  )
}

export default Sales
