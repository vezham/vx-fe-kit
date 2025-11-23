'use client'

import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import React from 'react'

import { Tab, Tabs } from '@vezham/react/v2'

export default function BooksLayout({
  headerEndContent,
  tabsEndContent
}: {
  headerEndContent?: React.ReactNode
  tabsEndContent?: React.ReactNode
}) {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const tabItems = [
    { key: 'overview', title: 'Overview', path: '/books/overview' },
    { key: 'sales', title: 'Sales', path: '/books/sales' },
    { key: 'purchase', title: 'Purchase', path: '/books/purchase' }
  ]

  // determine active tab based on URL
  const activeTab =
    tabItems.find(t => location.pathname.startsWith(t.path))?.key ??
    tabItems[0].key

  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        <div className="w-full xl:mx-12 xl:max-w-5xl">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Books</h1>
              <h2 className="text-small text-default-500 mt-2">
                Manage customer invoices and vendor bills.
              </h2>
            </div>
            <div>{headerEndContent}</div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="order-2 flex-1 sm:order-1">
              <Tabs
                aria-label="Books Tabs"
                selectedKey={activeTab}
                onSelectionChange={key => {
                  const tab = tabItems.find(t => t.key === key)
                  if (tab) navigate({ to: tab.path })
                }}
                variant="light"
                radius="full"
                classNames={{
                  base: 'w-full sm:flex',
                  tabList: 'w-full sm:w-auto justify-between bg-transparent',
                  cursor: 'bg-primary shadow-none',
                  tabContent:
                    'text-default-500 group-data-[selected=true]:text-white'
                }}>
                {tabItems.map(({ key, title }) => (
                  <Tab key={key} title={title} />
                ))}
              </Tabs>
            </div>

            <div className="order-1 sm:order-2">{tabsEndContent}</div>
          </div>

          <div className="w-full pb-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
