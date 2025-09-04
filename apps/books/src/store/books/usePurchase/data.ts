// eslint-disable-next-line @nx/enforce-module-boundaries
import { Purchase, purchaseStats, Status, Tags } from './types'

type StatusProps = {
  label: string
  color: string
}

export const getStatusProps: Record<Status, StatusProps> = {
  paid: {
    label: 'text-success',
    color: 'bg-success-300'
  },
  draft: {
    label: 'text-warning',
    color: 'bg-warning-300 '
  },
  overdue: {
    label: 'text-danger',
    color: 'bg-danger-300'
  },
  sent: {
    label: 'text-primary',
    color: 'bg-primary-300'
  },
  onhold: {
    label: 'text-secondary',
    color: 'bg-secondary-300'
  },
  pending: {
    label: 'text-foreground',
    color: 'bg-foreground-300'
  },
  cancelled: {
    label: 'text-danger',
    color: 'bg-danger-300'
  }
}

type columnProps = {
  id: string
  label: string
  info: string
}

export const getColumnProps: Record<Columns, columnProps> = {
  orderId: {
    id: 'orderId',
    label: 'Order ID',
    info: ''
  },
  externalOrderID: {
    id: 'externalOrderID',
    label: 'External Order ID',
    info: ''
  },
  vendor: {
    id: 'vendor',
    label: 'Customer / Vendor',
    info: ''
  },
  product: {
    id: 'product',
    label: 'Product',
    info: ''
  },
  date: {
    id: 'date',
    label: 'Date',
    info: 'The Date the Vendor Starts'
  },
  duedate: {
    id: 'duedate',
    label: 'Due Date',
    info: 'The Date the Vendor Ends'
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    info: ''
  },
  status: {
    id: 'status',
    label: 'Status',
    info: 'The Vendors Current status'
  },
  tags: {
    id: 'tags',
    label: 'Tags',
    info: ''
  },
  actions: {
    id: 'actions',
    label: 'Actions',
    info: ''
  }
}

export type Columns =
  | 'orderId'
  | 'externalOrderID'
  | 'vendor'
  | 'product'
  | 'date'
  | 'duedate'
  | 'amount'
  | 'status'
  | 'tags'
  | 'actions'

export const tags: Tags[] = [
  'Design',
  'Product',
  'Marketing',
  'Management',
  'Engineering',
  'Sales',
  'Support',
  'Other'
]

export const statuses: Status[] = [
  'paid',
  'draft',
  'overdue',
  'sent',
  'onhold',
  'pending',
  'cancelled'
]

export const INITIAL_VISIBLE_COLUMNS = [
  'orderId',
  'externalOrderID',
  'vendor',
  'product',
  'date',
  'duedate',
  'amount',
  'status',
  'tags',
  'actions'
] as const

const names = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'David Wilson',
  'Eve Martinez',
  'Frank Thompson',
  'Grace Garcia',
  'Hannah Lee',
  'Isaac Anderson',
  'Julia Roberts',
  'Liam Williams',
  'Mia White',
  'Noah Harris',
  'Olivia Martin',
  'Peyton Jones',
  'Quinn Taylor',
  'Ryan Moore',
  'Sophia Davis'
]

const products = [
  'Whispers of the Forgotten Shore',
  'The Quantum Paradox',
  'Beneath the Iron Sky',
  'Echoes in the Dust',
  'The Alchemist’s Journal',
  'Fragments of Tomorrow',
  'A Thousand Silent Stars',
  'The Hidden Orchard',
  'Chronicles of the Glass Kingdom',
  'Shadows over Avalon',
  'The Last Algorithm',
  'Letters to the Moon',
  'Empire of Ashes',
  'Dancing with Fireflies',
  'The Forgotten Codex'
]

export const purchaseStatData: purchaseStats[] = [
  {
    type: 'purchase',
    id: 1,
    title: 'Purchase / Vendor Bills',
    totalBilled: 508.5,
    paid: 0,
    outstanding: 508.5,
    totalBills: 2
  }
]

// export const generateFakePurchase = (count: number): Purchase[] => {
//   return Array.from({ length: count }).map((_, i) => ({
//     id: i + 1,
//     orderId: faker.number.int({ min: 100, max: 999 }),
//     externalOrderID: `EXT-${faker.string.alphanumeric(3).toUpperCase()}`,
//     vendor: {
//       avatar: faker.image.avatar(),
//       email: faker.internet.email(),
//       name: faker.person.fullName()
//     },
//     product: faker.helpers.arrayElement(products),
//     date: faker.date.recent({ days: 40 }),
//     dueDate: faker.date.soon({ days: 30 }),
//     amount: faker.finance.amount({ min: 0, max: 500, dec: 2 }),
//     tags: faker.helpers.arrayElements(tags, { min: 1, max: 5 }),
//     status: faker.helpers.arrayElement(statuses)
//   }))
// }
// export const purchaseData: Purchase[] = generateFakePurchase(10)

const generateMockUserData = (count: number): Purchase[] => {
  const mockData: Purchase[] = []
  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)]
    const selectProduct = products[Math.floor(Math.random() * products.length)]

    const user: Purchase = {
      id: i,
      orderId: Math.floor(Math.random() * 1000),
      externalOrderID: `EXT-${Math.floor(Math.random() * 1000)}`,
      vendor: {
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        email: `${selectedName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        name: selectedName
      },
      product: selectProduct,
      date: new Date(
        new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)
      ),
      dueDate: new Date(
        new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)
      ),
      amount: (Math.random() * 100).toFixed(2),

      tags: tags.filter(() => Math.random() > 0.5),

      status: statuses[Math.floor(Math.random() * statuses.length)]
    }
    mockData.push(user)
  }
  return mockData
}

export const purchaseData: Purchase[] = generateMockUserData(10)
