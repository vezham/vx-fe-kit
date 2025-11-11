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
        title: 'Sales',

        items: [
          {
            key: 'sales_register',
            href: '/reports/sales/sales_register',
            title: 'Sales Register',
            icon: 'solar:home-2-linear',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'customer_report',
            href: '/reports/sales/customer_report',
            title: 'Customer Report',
            icon: 'solar:home-2-linear',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'salesperson_report',
            href: '/reports/sales/sales_report',
            title: 'SalesPerson Report',
            icon: 'solar:home-2-linear',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'itemwise_report',
            href: '/reports/sales/itemwise_report',
            title: 'Itemwise Report',
            icon: 'solar:home-2-linear',
            startContent: (
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
        ),
        items: [
          {
            key: 'purchase_reports',
            href: '/reports/purchase/purchase_reports',
            title: 'Purchase Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'supplier_reports',
            href: '/reports/purchase/supplier_reports',
            title: 'Supplier Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'purchaser_reports',
            href: '/reports/purchase/purchaser_reports',
            title: 'Purchaser Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'itemwise_reports',
            href: '/reports/purchase/itemwise_reports',
            title: 'Itemwise Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
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
        key: 'project',
        title: 'Project',
        href: '/reports/project',
        icon: 'solar:pie-chart-2-outline'
      },
      {
        key: 'inventory',
        href: '/reports/inventory',
        icon: 'solar:home-2-linear',
        title: 'Inventory',
        items: [
          {
            key: 'itemwisereport',
            href: '/reports/inventory/itemwise',
            title: 'Itemwise Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'itemspurchase_reports',
            href: '/reports/inventory/itemspurchase',
            title: 'ItemsPurchase Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
              <Icon
                className="text-default-400"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            )
          },
          {
            key: 'itemssold_reports',
            href: '/reports/inventory/itemssold',
            title: 'ItemsSold Reports',
            icon: 'solar:add-circle-line-duotone',
            startContent: (
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
