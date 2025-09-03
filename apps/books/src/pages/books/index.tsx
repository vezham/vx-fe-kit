'use client'

import { Tab, Tabs } from '@heroui/react'
import React, { useState } from 'react'

import Overview from '../books/overview'
import Purchase from '../books/purchase'
import Sales from '../books/sales'

export default function BooksLayout({
  headerEndContent,
  tabsEndContent
}: {
  headerEndContent?: React.ReactNode
  tabsEndContent?: React.ReactNode
}) {
  const tabItems = [
    { key: 'overview', title: 'Overview', component: <Overview /> },
    { key: 'sales', title: 'Sales', component: <Sales /> },
    { key: 'purchase', title: 'Purchase', component: <Purchase /> }
  ]

  const [activeTab, setActiveTab] = useState(tabItems[0].key)

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
                onSelectionChange={key => setActiveTab(String(key))}
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
            {tabItems.find(t => t.key === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  )
}
