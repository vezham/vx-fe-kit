import React from 'react'

import AppContainerHeader from '../../layouts/app-container-header'

const Bank = () => {
  const [selected, setSelected] = React.useState('overview')

  const tabs = [
    { key: 'overview', title: 'Overview' },
    { key: 'transactions', title: 'Transactions' },
    { key: 'reconciliation', title: 'Reconciliation' },
    { key: 'reports', title: 'Reports' },
    { key: 'analytics', title: 'Analytics' }
  ]
  return (
    <div>
      <AppContainerHeader
        tabs={tabs}
        selectedKey={selected}
        onTabChange={setSelected}
        onSearch={v => console.log(v)}
        onAdd={() => console.log('add')}
      />
    </div>
  )
}

export default Bank
