import { FolderItem } from './types'

export const initialFolders: FolderItem[] = [
  {
    id: '1000',
    code: '1000',
    name: 'Assets',
    type: 'Asset',
    balance: 150000,
    children: [
      {
        id: '1100',
        code: '1100',
        name: 'Current Assets',
        type: 'Asset',
        balance: 85000,
        children: [
          {
            id: '1110',
            code: '1110',
            name: 'Cash & Cash Equivalents',
            type: 'Asset',
            balance: 45000,
            children: []
          },
          {
            id: '1120',
            code: '1120',
            name: 'Accounts Receivable',
            type: 'Asset',
            balance: 40000,
            children: []
          }
        ]
      },
      {
        id: '1200',
        code: '1200',
        name: 'Non-Current Assets',
        type: 'Asset',
        balance: 65000,
        children: [
          {
            id: '1210',
            code: '1210',
            name: 'Property & Equipment',
            type: 'Asset',
            balance: 45000,
            children: []
          },
          {
            id: '1220',
            code: '1220',
            name: 'Intangible Assets',
            type: 'Asset',
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
    type: 'Liability',
    balance: 45000,
    children: [
      {
        id: '2100',
        code: '2100',
        name: 'Current Liabilities',
        type: 'Liability',
        balance: 30000,
        children: [
          {
            id: '2110',
            code: '2110',
            name: 'Accounts Payable',
            type: 'Liability',
            balance: 20000,
            children: []
          },
          {
            id: '2120',
            code: '2120',
            name: 'Short-term Loans',
            type: 'Liability',
            balance: 10000,
            children: []
          }
        ]
      },
      {
        id: '2200',
        code: '2200',
        name: 'Non-Current Liabilities',
        type: 'Liability',
        balance: 15000,
        children: [
          {
            id: '2210',
            code: '2210',
            name: 'Long-term Loans',
            type: 'Liability',
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
    type: 'Equity',
    balance: 105000,
    children: [
      {
        id: '3100',
        code: '3100',
        name: 'Retained Earnings',
        type: 'Equity',
        balance: 75000,
        children: []
      },
      {
        id: '3200',
        code: '3200',
        name: 'Share Capital',
        type: 'Equity',
        balance: 30000,
        children: []
      }
    ]
  },
  {
    id: '4000',
    code: '4000',
    name: 'Revenue',
    type: 'Revenue',
    balance: 328000,
    children: [
      {
        id: '4100',
        code: '4100',
        name: 'Sales Revenue',
        type: 'Revenue',
        balance: 298000,
        children: [
          {
            id: '4110',
            code: '4110',
            name: 'Product Sales',
            type: 'Revenue',
            balance: 198000,
            children: []
          },
          {
            id: '4120',
            code: '4120',
            name: 'Service Revenue',
            type: 'Revenue',
            balance: 100000,
            children: []
          }
        ]
      },
      {
        id: '4200',
        code: '4200',
        name: 'Other Revenue',
        type: 'Revenue',
        balance: 30000,
        children: []
      }
    ]
  },
  {
    id: '5000',
    code: '5000',
    name: 'Expenses',
    type: 'Expense',
    balance: 231000,
    children: [
      {
        id: '5100',
        code: '5100',
        name: 'Operating Expenses',
        type: 'Expense',
        balance: 158000,
        children: [
          {
            id: '5110',
            code: '5110',
            name: 'Salaries & Wages',
            type: 'Expense',
            balance: 120000,
            children: []
          },
          {
            id: '5120',
            code: '5120',
            name: 'Rent Expense',
            type: 'Expense',
            balance: 38000,
            children: []
          }
        ]
      },
      {
        id: '5200',
        code: '5200',
        name: 'Administrative Expenses',
        type: 'Expense',
        balance: 73000,
        children: [
          {
            id: '5210',
            code: '5210',
            name: 'Office Supplies',
            type: 'Expense',
            balance: 23000,
            children: []
          },
          {
            id: '5220',
            code: '5220',
            name: 'Utilities',
            type: 'Expense',
            balance: 50000,
            children: []
          }
        ]
      }
    ]
  }
]
