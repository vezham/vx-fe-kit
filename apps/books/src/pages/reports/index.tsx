'use client'

import { Tab, Tabs } from '@heroui/react'
import React, { useState } from 'react'

import BalanceSheet from '../reports/balance_sheet'
import CashFlow from '../reports/cashflow'
import ChartofAccounts from '../reports/chartof_accounts'
import Overview from '../reports/overview'
import ProfitLoss from '../reports/profit_loss'
export default function ReportsLayout({
  headerEndContent
}: {
  headerEndContent?: React.ReactNode
}) {
  const tabItems = [
    { key: 'overview', title: 'Overview', component: <Overview /> },
    {
      key: 'chartofaccounts',
      title: 'Chart of Accounts',
      component: <ChartofAccounts />
    },
    { key: 'profit&loss', title: 'Profit & Loss', component: <ProfitLoss /> },
    {
      key: 'balancesheet',
      title: 'Balance Sheet',
      component: <BalanceSheet />
    },
    { key: 'cashflow', title: 'Cash Flow', component: <CashFlow /> }
  ]

  const [activeTab, setActiveTab] = useState(tabItems[0].key)

  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        <div className="w-full xl:mx-12 xl:max-w-5xl">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Financial Reports</h1>
              <h2 className="text-small text-default-500 mt-2">
                View comprehensive financial reports and analytics
              </h2>
            </div>
            <div>{headerEndContent}</div>
          </div>

          <div className="mt-6">
            <div className="flex-1">
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
          </div>

          <div className="mt-6 w-full">
            {tabItems.find(t => t.key === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  )
}
