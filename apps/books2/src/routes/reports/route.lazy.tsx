'use client'

import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'
import React, { useState } from 'react'

import { ScrollShadow } from '@vezham/react/v2'
import { Surface } from '@vezham/react/v3'

import { HeaderActions } from '../../components/actions'
import {Sidebar} from '../../components/sidebar'
import AppContainerHeader from '../../layouts/app-container-header'
import { sectionItems } from '../../pages/reports/sidebar/items'
import ReportsSidebar from '../../pages/reports/sidebar/sidebar'

export const Route = createLazyFileRoute('/reports')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const [showSidebarMobile, setShowSidebarMobile] = useState(true)

  const path = location.pathname

  const getActiveKey = (path: string) => {
    if (path === '/reports' || path === '/reports/') return 'overview'

    for (const section of sectionItems) {
      for (const item of section.items ?? []) {
        if (item.href === path) return item.key

        for (const subItem of item.items ?? []) {
          if (subItem.href === path) return subItem.key
        }
      }
    }

    return ''
  }

  const activeKey = getActiveKey(path)

  const findHrefByKey = (key: string) => {
    for (const section of sectionItems) {
      for (const item of section.items ?? []) {
        if (item.key === key) return item.href

        for (const subItem of item.items ?? []) {
          if (subItem.key === key) return subItem.href
        }
      }
    }
  }

  const handleSelect = (key: string) => {
    const href = findHrefByKey(key)
    if (!href) return

    navigate({ to: href })
    setShowSidebarMobile(false)
  }

  const goBack = () => {
    setShowSidebarMobile(true)
  }

  const goClose = () => {
    navigate({ to: '/reports' })
  }

  const getHeaderTabs = () => {
    if (path.startsWith('/reports/sales')) {
      return [
        {
          key: 'salesregister',
          title: 'Sales Register',
          href: '/reports/sales/sales-register'
        },
        {
          key: 'customerreport',
          title: 'Customer Report',
          href: '/reports/sales/customer-report'
        },
        {
          key: 'salesreport',
          title: 'SalesPerson Report',
          href: '/reports/sales/sales-report'
        },
        {
          key: 'itemwise',
          title: 'Itemwise Report',
          href: '/reports/sales/itemwise-report'
        }
      ]
    }

    if (path.startsWith('/reports/purchase')) {
      return [
        {
          key: 'purchasereport',
          title: 'Purchase Report',
          href: '/reports/purchase/purchase-reports'
        },
        {
          key: 'supplierreport',
          title: 'Supplier Report',
          href: '/reports/purchase/supplier-reports'
        },
        {
          key: 'purchaserreport',
          title: 'Purchaser Report',
          href: '/reports/purchase/purchaser-reports'
        },
        {
          key: 'itemwise',
          title: 'Itemwise Report',
          href: '/reports/purchase/itemwise-reports'
        }
      ]
    }

    if (path.startsWith('/reports/inventory')) {
      return [
        {
          key: 'itemwise',
          title: 'Itemwise Report',
          href: '/reports/inventory/itemwise-report'
        },
        {
          key: 'purchase',
          title: 'ItemPurchase Report',
          href: '/reports/inventory/itempurchase-report'
        },
        {
          key: 'sold',
          title: 'ItemsSold Report',
          href: '/reports/inventory/itemssold-report'
        }
      ]
    }

    return []
  }

  const tabs = getHeaderTabs()

  const selectedKey =
    tabs.find(t => path.startsWith(t.href))?.key ?? tabs[0]?.key ?? ''

  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.key === key)
    if (!tab) return

    navigate({ to: tab.href })
  }

  const showTabsHeader =
    path.startsWith('/reports/sales') ||
    path.startsWith('/reports/purchase') ||
    path.startsWith('/reports/inventory')

  return (
    <Surface className="bg-background flex h-screen w-full flex-col overflow-hidden p-4">
      <Surface variant="transparent" className="p-3">
        {showTabsHeader ? (
          <AppContainerHeader
            tabs={tabs}
            selectedKey={selectedKey}
            onTabChange={handleTabChange}
          />
        ) : (
          <AppContainerHeader onAdd={() => console.log('add')} />
        )}
      </Surface>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div
          className={`w-full md:w-[320px] md:min-w-[320px] ${showSidebarMobile ? 'block' : 'hidden'} md:block`}>
          <Sidebar>
            <ScrollShadow className="h-full">
              <ReportsSidebar
                items={sectionItems}
                selectedKey={activeKey}
                onSelect={handleSelect}
              />
            </ScrollShadow>
          </Sidebar>
        </div>

        <div
          className={`flex w-full flex-1 flex-col overflow-hidden ${showSidebarMobile ? 'hidden md:flex' : 'flex'} `}>
          <HeaderActions
            showBack
            showClose
            onBack={goBack}
            onClose={goClose}
            actions={[{ key: 'more', icon: 'mdi:dots-vertical' }]}
          />

          <Surface className="flex-1 overflow-auto rounded-xl p-4">
            <Outlet />
          </Surface>
        </div>
      </div>
    </Surface>
  )
}
