import type { SortDescriptor } from '@vezham/react-v3'

import type {
  ClassFormState,
  ClassRow,
  ClassStatus,
  DatePresetKey,
  typeStatus
} from './types'

export const initialRows: ClassRow[] = [
  {
    id: 'SU128394',

    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    name: 'English',
    code: '101',
    type: 'Theory'
  },
  {
    id: 'SU128393',

    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    name: 'Maths',
    code: '102',
    type: 'Theory'
  },
  {
    id: 'SU128392',

    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    name: 'Physics',
    code: '103',
    type: 'Practical'
  },
  {
    id: 'SU128391',

    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    name: 'Chemistry',
    code: '104',
    type: 'Practical'
  },
  {
    id: 'SU128390',

    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    name: 'Biology',
    code: '105',
    type: 'Practical'
  },
  {
    id: 'SU128389',

    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    name: 'Higher Math',
    code: '106',
    type: 'Practical'
  },
  {
    id: 'SU128388',

    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    name: 'Information Technology',
    code: '107',
    type: 'Practical'
  },
  {
    id: 'SU128387',

    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    name: 'Moral Education',
    code: '108',
    type: 'Practical'
  },
  {
    id: 'SU128386',

    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    name: 'Finance',
    code: '109',
    type: 'Theory'
  },
  {
    id: 'SU128385',

    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    name: 'Economics',
    code: '110',
    type: 'Theory'
  }
]

export const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]

export const sortOptions = [
  {
    key: 'ascending',
    label: 'Ascending',
    descriptor: {
      column: 'type',
      direction: 'ascending'
    } satisfies SortDescriptor
  },
  {
    key: 'descending',
    label: 'Descending',
    descriptor: {
      column: 'type',
      direction: 'descending'
    } satisfies SortDescriptor
  },
  {
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    descriptor: {
      column: 'viewedAt',
      direction: 'descending'
    } satisfies SortDescriptor
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    descriptor: {
      column: 'createdAt',
      direction: 'descending'
    } satisfies SortDescriptor
  }
] as const

export const rowCountOptions = ['5', '10', '25', '50']
export const nameOptions = [
  'English',
  'Economics',
  'Finance',
  'Maths',
  'Higher Math',
  'Moral Education',
  'Information Technology',
  'Biology',
  'Physics',
  'Chemistry'
]

export const codeOptions = [
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110'
]
export const typeOptions: typeStatus[] = ['Theory', 'Practical']
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  name: '',
  code: '',
  type: 'Theory',
  status: 'Active'
}
