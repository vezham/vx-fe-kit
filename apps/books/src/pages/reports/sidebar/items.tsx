// layouts/reports/items.tsx
import { Icon } from '@iconify/react'
import type { SidebarItem } from './sidebar'

export const sectionItems: SidebarItem[] = [
  {
    key: 'home',
    title: 'Home',
    items: [
      {
        key: 'overview',
        href: '/reports/overview',
        icon: 'solar:home-2-linear',
        title: 'Overview'
      },
      {
        key: 'chartofaccounts',
        href: '/reports/chartofaccounts',
        icon: 'solar:widget-2-outline',
        title: 'Chart of Accounts',
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        )
      }
    ]
  },
  {
    key: 'journalledger',
    title: 'Journal Ledgers',
    items: [
      {
        key: 'profit_loss',
        href: '/reports/profitloss',
        title: 'Profit & Loss',
        icon: 'solar:pie-chart-2-outline'
      },
      {
        key: 'balancesheet',
        href: '/reports/balancesheet',
        icon: 'solar:chart-outline',
        title: 'Balance Sheet'
      }
    ]
  },
  {
    key: 'statements',
    title: 'Statements',
    items: [
      {
        key: 'cashflow',
        href: '/reports/cashflow',
        icon: 'solar:home-2-linear',
        title: 'Cash Flow'
      },
      {
        key: 'credits',
        href: '/reports/credits',
        icon: 'solar:widget-2-outline',
        title: 'Credits',
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        )
      }
    ]
  },
  {
    key: 'charts',
    title: 'Charts',
    items: [
      {
        key: 'current',
        href: '/reports/current',
        icon: 'solar:home-2-linear',
        title: 'Current'
      },
      {
        key: 'savings',
        href: '/reports/savings',
        icon: 'solar:widget-2-outline',
        title: 'Savings',
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        )
      }
    ]
  },
  {
    key: 'invoices',
    title: 'Invoices',
    items: [
      {
        key: 'transactions',
        href: '/reports/transactions',
        icon: 'solar:home-2-linear',
        title: 'Transactions'
      },
      {
        key: 'getures',
        href: '/reports/getures',
        icon: 'solar:widget-2-outline',
        title: 'Getures',
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        )
      }
    ]
  }
]
