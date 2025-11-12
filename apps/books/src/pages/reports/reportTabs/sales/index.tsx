'use client'

import { Tab, Tabs } from '@heroui/react'
import { useLocation, useRouter } from '@tanstack/react-router'
import CustomerReport from './customerReport/customerReport'
import ItemWiseReport from './itemwiseReport/itemWiseReport'
import SalesPerson from './salesPerson/salesPerson'
import SalesRegister from './salesRegister/salesRegister'

const Sales = () => {
  const router = useRouter()
  const location = useLocation()

  const tabItems = [
    {
      key: 'sales_register',
      title: 'Sales Register',
      href: '/reports/sales/sales_register',
      component: <SalesRegister />
    },
    {
      key: 'customer_report',
      title: 'Customer Report',
      href: '/reports/sales/customer_report',
      component: <CustomerReport />
    },
    {
      key: 'salesperson_report',
      title: 'SalesPerson Report',
      href: '/reports/sales/salesperson_report',
      component: <SalesPerson />
    },
    {
      key: 'itemwise_report',
      title: 'Itemwise Report',
      href: '/reports/sales/itemwise_report',
      component: <ItemWiseReport />
    }
  ]

  const pathname = location.pathname ?? ''
  const activeKey =
    tabItems.find(tab => pathname.includes(tab.key))?.key || 'sales_register'

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

export default Sales
