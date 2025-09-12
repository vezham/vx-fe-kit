import { FolderItem } from './types'

import { Types } from './types'

type typeProps = {
  label: string
  color: string
}

export const getTypesProps: Record<Types, typeProps> = {
  asset: {
    label: 'Assets',
    color: 'bg-blue-100 text-blue-800'
  },
  liability: {
    label: 'Liability',
    color: 'bg-red-100 text-red-800'
  },
  equity: {
    label: 'Equity',
    color: 'bg-purple-100 text-purple-800'
  },
  expense: {
    label: 'Expense',
    color: 'bg-orange-100 text-orange-800'
  },
  revenue: {
    label: 'Revenue',
    color: 'bg-green-100 text-green-800'
  }
}

export const initialFolders: FolderItem[] = [
  {
    id: '1000',
    code: '1000',
    name: 'Assets',
    type: 'asset',
    balance: 150000,
    children: [
      {
        id: '1100',
        code: '1100',
        name: 'Current Assets',
        type: 'asset',
        balance: 85000,
        children: [
          {
            id: '1110',
            code: '1110',
            name: 'Cash & Cash Equivalents',
            type: 'asset',
            balance: 45000,
            children: []
          },
          {
            id: '1120',
            code: '1120',
            name: 'Accounts Receivable',
            type: 'asset',
            balance: 40000,
            children: []
          }
        ]
      },
      {
        id: '1200',
        code: '1200',
        name: 'Non-Current Assets',
        type: 'asset',
        balance: 65000,
        children: [
          {
            id: '1210',
            code: '1210',
            name: 'Property & Equipment',
            type: 'asset',
            balance: 45000,
            children: []
          },
          {
            id: '1220',
            code: '1220',
            name: 'Intangible Assets',
            type: 'asset',
            balance: 20000,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '2000',
    code: '2000',
    name: 'Liabilities',
    type: 'liability',
    balance: 45000,
    children: [
      {
        id: '2100',
        code: '2100',
        name: 'Current Liabilities',
        type: 'liability',
        balance: 30000,
        children: [
          {
            id: '2110',
            code: '2110',
            name: 'Accounts Payable',
            type: 'liability',
            balance: 20000,
            children: []
          },
          {
            id: '2120',
            code: '2120',
            name: 'Short-term Loans',
            type: 'liability',
            balance: 10000,
            children: []
          }
        ]
      },
      {
        id: '2200',
        code: '2200',
        name: 'Non-Current Liabilities',
        type: 'liability',
        balance: 15000,
        children: [
          {
            id: '2210',
            code: '2210',
            name: 'Long-term Loans',
            type: 'liability',
            balance: 15000,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '3000',
    code: '3000',
    name: 'Equity',
    type: 'equity',
    balance: 105000,
    children: [
      {
        id: '3100',
        code: '3100',
        name: 'Retained Earnings',
        type: 'equity',
        balance: 75000,
        children: []
      },
      {
        id: '3200',
        code: '3200',
        name: 'Share Capital',
        type: 'equity',
        balance: 30000,
        children: []
      }
    ]
  },
  {
    id: '4000',
    code: '4000',
    name: 'Revenue',
    type: 'revenue',
    balance: 328000,
    children: [
      {
        id: '4100',
        code: '4100',
        name: 'Sales Revenue',
        type: 'revenue',
        balance: 298000,
        children: [
          {
            id: '4110',
            code: '4110',
            name: 'Product Sales',
            type: 'revenue',
            balance: 198000,
            children: []
          },
          {
            id: '4120',
            code: '4120',
            name: 'Service Revenue',
            type: 'revenue',
            balance: 100000,
            children: []
          }
        ]
      },
      {
        id: '4200',
        code: '4200',
        name: 'Other Revenue',
        type: 'revenue',
        balance: 30000,
        children: []
      }
    ]
  },
  {
    id: '5000',
    code: '5000',
    name: 'Expenses',
    type: 'expense',
    balance: 231000,
    children: [
      {
        id: '5100',
        code: '5100',
        name: 'Operating Expenses',
        type: 'expense',
        balance: 158000,
        children: [
          {
            id: '5110',
            code: '5110',
            name: 'Salaries & Wages',
            type: 'expense',
            balance: 120000,
            children: []
          },
          {
            id: '5120',
            code: '5120',
            name: 'Rent Expense',
            type: 'expense',
            balance: 38000,
            children: []
          }
        ]
      },
      {
        id: '5200',
        code: '5200',
        name: 'Administrative Expenses',
        type: 'expense',
        balance: 73000,
        children: [
          {
            id: '5210',
            code: '5210',
            name: 'Office Supplies',
            type: 'expense',
            balance: 23000,
            children: []
          },
          {
            id: '5220',
            code: '5220',
            name: 'Utilities',
            type: 'expense',
            balance: 50000,
            children: []
          }
        ]
      }
    ]
  }
]
