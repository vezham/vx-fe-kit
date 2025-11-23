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
      }
    ]
  },
  {
    key: 'financial-performance',
    title: 'Financial Performance',
    items: [
      {
        key: 'chartofaccounts',
        href: '/reports/chartofaccounts',
        icon: 'solar:widget-2-outline',
        title: 'Chart of Accounts'
      },
      {
        key: 'journal_entries',
        href: '/reports/journal_entries',
        title: 'Journal Entries',
        icon: 'solar:pie-chart-2-outline'
      },
      {
        key: 'general_ledger',
        href: '/reports/general_ledger',
        title: 'General Ledger',
        icon: 'solar:pie-chart-2-outline'
      },
      {
        key: 'trial_balance',
        href: '/reports/trialbalance',
        title: 'Trial Balance',
        icon: 'solar:pie-chart-2-outline'
      },

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
      },
      {
        key: 'cashflow_statement',
        href: '/reports/cashflow',
        icon: 'solar:chart-outline',
        title: 'CashFlow Statement'
      }
    ]
  },
  {
    key: 'analytics',
    title: 'Analytics',
    items: [
      {
        key: 'sales',
        href: '/reports/sales',
        icon: 'solar:home-2-linear',
        title: 'Sales'
      },
      {
        key: 'purchase',
        href: '/reports/purchase',
        icon: 'solar:widget-2-outline',
        title: 'Purchase',
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        )
      },
      {
        key: 'project',
        title: 'Project',
        href: '/reports/project',
        icon: 'solar:pie-chart-2-outline'
      },
      {
        key: 'inventory',
        href: '/reports/inventory',
        icon: 'solar:home-2-linear',
        title: 'Inventory'
      }
    ]
  },

  {
    key: 'taxation',
    title: 'Taxation',
    items: [
      {
        key: 'gst_reports',
        href: '/reports/gst',
        icon: 'solar:home-2-linear',
        title: 'GST Reports'
      },
      {
        key: 'vat_reports',
        href: '/reports/vat',
        icon: 'solar:widget-2-outline',
        title: 'VAT Reports'
      }
    ]
  }
]
