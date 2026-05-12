import type { AcademicMenuItem, ActionItem } from './types'

export const reportsSidebarItems: AcademicMenuItem[] = [
  {
    key: 'fees',
    title: 'Fees Collections',
    href: '/operations/fees',
    icon: 'lucide:calendar-check',
    children: [
      {
        key: 'fees-group',
        title: 'Fees Group',
        href: '/operations/fees/fees-group',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'fees-type',
        title: 'Fees Type',
        href: '/operations/fees/fees-type',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'daily-attendance',
        title: 'Fees Master',
        href: '/operations/fees/fees-master',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'student-day-wise',
        title: 'Fees Assign',
        href: '/operations/fees/fees-assign',
        icon: 'lucide:user'
      },
      {
        key: 'teacher-day-wise',
        title: 'Collect Fees',
        href: '/operations/fees/collect-fees',
        icon: 'lucide:graduation-cap'
      }
    ]
  },
  {
    key: 'library',
    title: 'Library',
    href: '/operations/library',
    icon: 'lucide:school',
    children: [
      {
        key: 'members',
        title: 'Library Members',
        href: '/operations/library/members',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'books',
        title: 'Books',
        href: '/operations/library/books',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'issue-book',
        title: 'Issue Book',
        href: '/operations/library/issue-book',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'return',
        title: 'Return',
        href: '/operations/library/return',
        icon: 'lucide:user'
      }
    ]
  },
  {
    key: 'sports',
    title: 'Sports',
    href: '/operations/sports',
    icon: 'lucide:users'
  },
  {
    key: 'hostel',
    title: 'Hostel',
    href: '/operations/hostel',
    icon: 'lucide:badge-check',
    children: [
      {
        key: 'hostel-list',
        title: 'Hostel List',
        href: '/operations/hostel/hostel-list',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'hostel-room',
        title: 'Hostel Room',
        href: '/operations/hostel/hostel-room',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'hostel-type',
        title: 'Hostel Type',
        href: '/operations/hostel/room-type',
        icon: 'lucide:calendar-days'
      }
    ]
  },
  {
    key: 'transport',
    title: 'Transport',
    href: '/operations/transport',
    icon: 'lucide:calendar-minus',
    children: [
      {
        key: 'routes',
        title: 'Routes',
        href: '/operations/transport/routes',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'pickup-points',
        title: 'Pickup points',
        href: '/operations/transport/pickup-points',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'vehicle-drivers',
        title: 'Vehicle Drivers',
        href: '/operations/transport/vehicle-drivers',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'vehicles',
        title: 'Vehicles',
        href: '/operations/transport/vehicles',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'assign',
        title: 'Assign Vehicles',
        href: '/operations/transport/assign',
        icon: 'lucide:calendar-days'
      }
    ]
  }
]

export const defaultLeftActions: ActionItem[] = [
  {
    key: 'back',
    label: 'Back',
    icon: 'lucide:arrow-left',
    onAction: () => window.history.back()
  },
  {
    key: 'forward',
    label: 'Forward',
    icon: 'lucide:arrow-right',
    onAction: () => window.history.forward()
  }
]

export const defaultRightActions: ActionItem[] = [
  {
    key: 'search',
    label: 'Search',
    icon: 'lucide:search',
    kind: 'search'
  },
  {
    key: 'import',
    label: 'Import',
    icon: 'lucide:upload',
    kind: 'menu'
  },
  {
    key: 'print',
    label: 'Print',
    icon: 'lucide:printer',
    kind: 'menu',
    onAction: () => window.print()
  },
  {
    key: 'export',
    label: 'Export',
    icon: 'lucide:download',
    kind: 'menu'
  },
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'lucide:refresh-cw',
    kind: 'refresh',
    onAction: () => window.location.reload()
  }
]

export const createLabelsByPageKey: Record<string, string> = {}

export const createExcludedPageKeys = new Set([
  'attendance-report',
  'students-attendance-type',
  'daily-attendance',
  'student-day-wise',
  'teacher-day-wise',
  'staff-day-wise',
  'teacher-report',
  'staff-report'
])
