import React from 'react'
import Header from '../components/header/index'

const dashboard = () => {
  const tabsData = [
    // { key: "profile", title: "Profile", content: React.createElement("div", null, "Profile Content") },
    // { key: "appearance", title: "Appearance", content: React.createElement("div", null, "Appearance Content") },
    // { key: "account", title: "Account", content: React.createElement("div", null, "Account Content") },
    // { key: "billing", title: "Billing", content: React.createElement("div", null, "Billing Content") },
    // { key: "team", title: "Team", content: React.createElement("div", null, "Team Content") },

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
      />
    </div>
  )
}

export default dashboard
