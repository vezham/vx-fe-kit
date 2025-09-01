import { purchaseStats, purchaseUserProps } from './types'

export const chipColorMap: Record<string, string> = {
  Active: 'bg-success-300 text-success',
  Pending: 'bg-foreground-300 text-foreground',
  Vacation: 'bg-warning-300 text-warning',
  Inactive: 'bg-danger-300 text-danger'
}

export const columns = [
  { name: 'User', uid: 'userInfo', sortDirection: 'ascending' },
  { name: 'Role', uid: 'role' },
  { name: 'Status', uid: 'status', info: "The user's current status" },
  { name: 'Last Login', uid: 'lastLogin', info: 'The date the user started' },
  { name: 'Actions', uid: 'actions' }
]

export type ColumnsKey =
  | 'userInfo'
  | 'country'
  | 'role'
  | 'workerType'
  | 'status'
  | 'lastLogin'
  | 'actions'

export const INITIAL_VISIBLE_COLUMNS = [
  'userInfo',
  'role',
  'status',
  'lastLogin',
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

const roles = [
  'Software Engineer',
  'Marketing Specialist',
  'Human Resources Manager',
  'Data Analyst',
  'Project Manager',
  'Sales Executive',
  'Graphic Designer',
  'Operations Coordinator',
  'Product Manager',
  'Customer Service Representative',
  'Network Administrator',
  'Quality Assurance Tester',
  'Business Analyst',
  'Content Writer',
  'UX/UI Designer'
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

const generateMockUserData = (count: number): purchaseUserProps[] => {
  const mockData: purchaseUserProps[] = []
  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)]
    const selectedRole = roles[Math.floor(Math.random() * roles.length)]

    const user: purchaseUserProps = {
      id: i,
      userInfo: {
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        email: `${selectedName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        name: selectedName
      },
      role: selectedRole,
      status:
        Math.random() > 0.5
          ? 'Active'
          : Math.random() > 0.5
            ? 'Pending'
            : Math.random() > 0.5
              ? 'Vacation'
              : 'Inactive',
      lastLogin: new Date(
        new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)
      )
    }
    mockData.push(user)
  }
  return mockData
}

export const purchaseUsers: purchaseUserProps[] = generateMockUserData(10)
