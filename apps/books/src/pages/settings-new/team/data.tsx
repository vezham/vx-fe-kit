import { JSX } from 'react'
import { StatusOptions, Users } from './types'

const createCircleSvg = (fillColor: string): JSX.Element => (
  <svg
    fill="none"
    height="7"
    viewBox="0 0 7 7"
    width="7"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="3.5" cy="3.5" fill={fillColor} r="3.5" />
  </svg>
)

export const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'inactive' },
  { name: 'Pending', uid: 'pending' },
  { name: 'Vacation', uid: 'vacation' }
] as const

export const statusColorMap: Record<StatusOptions, JSX.Element> = {
  Active: createCircleSvg('#17C964'),
  Inactive: createCircleSvg('#ff2727ff'),
  Pending: createCircleSvg('#bebcc0ff'),
  Vacation: createCircleSvg('#F5A524')
}

export type ColumnsKey =
  | 'userInfo'
  | 'country'
  | 'role'
  | 'workerType'
  | 'status'
  | 'lastLogin'
  | 'actions'

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  'userInfo',
  'role',
  'status',
  'lastLogin',
  'actions'
]

export const roleOptions = [
  { label: 'Member', value: 'member', description: 'team member' },
  { label: 'Admin', value: 'admin', description: 'team admin' },
  { label: 'Owner', value: 'owner', description: 'team owner' }
]

export const role = [
  {
    name: 'Admin',
    permissions: [
      { label: 'Full system access', type: 'success' as const },
      { label: 'Manage users', type: 'success' as const },
      { label: 'Financial data access', type: 'success' as const },
      { label: 'System configuration', type: 'success' as const }
    ]
  },
  {
    name: 'Accountant',
    permissions: [
      { label: 'Financial data access', type: 'success' },
      { label: 'Create/edit transactions', type: 'success' },
      { label: 'Generate reports', type: 'success' },
      { label: 'No user management', type: 'danger' }
    ]
  },
  {
    name: 'Viewer',
    permissions: [
      { label: 'View financial data', type: 'success' },
      { label: 'View reports', type: 'success' },
      { label: 'No edit permissions', type: 'danger' },
      { label: 'No user management', type: 'danger' }
    ]
  }
]

export const columns = [
  { name: 'User', uid: 'userInfo', sortDirection: 'ascending' },
  { name: 'Role', uid: 'role' },
  { name: 'Status', uid: 'status', info: "The user's current status" },
  { name: 'Last Login', uid: 'lastLogin', info: 'The date the user started' },
  { name: 'Actions', uid: 'actions' }
]

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

const generateMockUserData = (count: number): Users[] => {
  const mockData: Users[] = []
  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)]
    const selectedRole = roles[Math.floor(Math.random() * roles.length)]

    const user: Users = {
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

export const users: Users[] = generateMockUserData(10)
