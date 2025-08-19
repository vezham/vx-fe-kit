import { ColorMap, IconMap, Member, Role } from './types'

export const members: Member[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-29',
    initials: 'JD',
    statusColor: 'success'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@company.com',
    role: 'Accountant',
    status: 'Active',
    lastLogin: '2024-01-28',
    initials: 'JS',
    statusColor: 'success'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'Viewer',
    status: 'Pending',
    lastLogin: 'Never',
    initials: 'MJ',
    statusColor: 'secondary'
  }
]

export const roles: Role[] = [
  {
    name: 'Admin',
    permissions: [
      { label: 'Full system access', type: 'success' },
      { label: 'Manage users', type: 'success' },
      { label: 'Financial data access', type: 'success' },
      { label: 'System configuration', type: 'success' }
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

export const icons: IconMap = {
  success: 'solar:check-circle-bold',
  danger: 'solar:danger-circle-bold'
}

export const colors: ColorMap = {
  success: 'text-green-600',
  danger: 'text-red-600'
}
