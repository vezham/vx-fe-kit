'use client'

import { Tab, Tabs } from '@heroui/react'
import { useLocation, useRouter } from '@tanstack/react-router'
import ItemPurchaseReport from './itemPurchase/itemPurchase'
import ItemSoldReport from './itemSold/itemSold'
import ItemWiseReport from './itemwise/itemInventoryWiseReport'

const Inventory = () => {
  const router = useRouter()
  const location = useLocation()

  const tabItems = [
    {
      key: 'itemwise',
      title: 'Itemwise Reports',
      href: '/reports/inventory/itemwise',
      component: <ItemWiseReport />
    },
    {
      key: 'itempurchase',
      title: 'ItemPurchase Reports',
      href: '/reports/inventory/itempurchase',
      component: <ItemPurchaseReport />
    },
    {
      key: 'itemsold',
      title: 'ItemsSold Reports',
      href: '/reports/inventory/itemsold',
      component: <ItemSoldReport />
    }
  ]

  const pathname = location.pathname ?? ''
  const activeKey =
    tabItems.find(tab => pathname.includes(tab.key))?.key || 'itemwise'

  const handleChange = (key: string) => {
    const tab = tabItems.find(t => t.key === key)
    if (tab) {
      router.navigate({ to: tab.href })
    }
  }

  const activeTab = tabItems.find(tab => tab.key === activeKey)

  return (
    <div>
      <Tabs
        fullWidth
        selectedKey={activeKey}
        onSelectionChange={key => handleChange(key as string)}
        classNames={{
          base: 'w-full max-w-2xl',
          panel: 'w-full p-0 pt-4'
        }}>
        {tabItems.map(({ key, title }) => (
          <Tab key={key} title={title} />
        ))}
      </Tabs>
      <div className="mt-4">{activeTab?.component}</div>
    </div>
  )
}

export default Inventory
