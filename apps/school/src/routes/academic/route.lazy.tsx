import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import DynamicHeader, {
  ActionItem,
  TabItem
} from '../../components/actions-header'

export const Route = createLazyFileRoute('/academic')({
  component: RouteComponent
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState('all-classes')

  const tabs: TabItem[] = [
    { key: 'classes', title: 'AllClasses', icon: 'lucide:calendar' },
    { key: 'schedule', title: 'Schedule', icon: 'lucide:calendar' }
  ]

  const actions: ActionItem[] = [
    {
      key: 'create',
      label: 'Create',
      icon: 'lucide:plus',
      onAction: pageKey => {
        console.log(`Add class action triggered on page: ${pageKey}`)
      }
    },
    {
      key: 'import',
      label: 'Import Classes',
      icon: 'lucide:upload',
      onAction: pageKey => {
        console.log(`Import classes on: ${pageKey}`)
      }
    },
    {
      key: 'export',
      label: 'Export List',
      icon: 'lucide:download',
      shortcut: '⌘E',
      onAction: pageKey => {
        console.log(`Export classes on: ${pageKey}`)
      }
    }
  ]

  const handleSearch = (query: string, pageKey: string) => {
    console.log(`Searching "${query}" on ${pageKey}`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col p-4">
      <DynamicHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={actions}
        leftActions={[
          { key: 'back', label: 'Back', icon: 'lucide:arrow-left' },
          { key: 'forward', label: 'Forward', icon: 'lucide:arrow-right' }
        ]}
        showSearch={true}
        onSearch={handleSearch}
      />
      <Surface className="rounded-xl p-4">
        <Outlet />
      </Surface>
    </div>
  )
}
