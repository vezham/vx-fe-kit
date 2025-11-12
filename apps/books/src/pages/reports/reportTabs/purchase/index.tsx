'use client'

import { Tab, Tabs } from '@heroui/react'
import { useLocation, useRouter } from '@tanstack/react-router'
import ItemWiseReport from './itemwiseReport/itemWiseReport'
import PurchaseReport from './purchaseReport/purchaseReport'
import PurchaserReport from './purchaserReport/purchaserReport'
import SupplierReport from './supplierReport/supplierReport'

const Purchase = () => {
  const router = useRouter()
  const location = useLocation()

  const tabItems = [
    {
      key: 'purchase_reports',
      title: 'Purchase Reports',
      href: '/reports/purchase/purchase_reports',
      component: <PurchaseReport />
    },
    {
      key: 'supplier_reports',
      title: 'Supplier Reports',
      href: '/reports/purchase/supplier_reports',
      component: <SupplierReport />
    },
    {
      key: 'purchaser_reports',
      title: 'Purchaser Reports',
      href: '/reports/purchase/purchaser_reports',
      component: <PurchaserReport />
    },
    {
      key: 'itemwise_report',
      title: 'Itemwise Reports',
      href: '/reports/purchase/itemwise_reports',
      component: <ItemWiseReport />
    }
  ]

  const pathname = location.pathname ?? ''
  const activeKey =
    tabItems.find(tab => pathname.includes(tab.key))?.key || 'purchase_reports'

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

export default Purchase
