import type { SortDescriptor } from '@vezham/react-v3'

import type {
  ClassFormState,
  ClassRow,
  ClassStatus,
  DatePresetKey
} from './types'

export const initialRows: ClassRow[] = [
  {
    id: 'G180482',

    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    grade: 'O',
    percentage: '90% - 100%',
    points: '10'
  },
  {
    id: 'G180481',

    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    grade: 'A+',
    percentage: '80% - 90%',
    points: '8'
  },
  {
    id: 'G180480',

    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    grade: 'A',
    percentage: '70% - 80%',
    points: '6'
  },
  {
    id: 'G180479',

    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    grade: 'B+',
    percentage: '60% - 70%',
    points: '4'
  },
  {
    id: 'G180478',

    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    grade: 'B',
    percentage: '60% - 70%',
    points: '3'
  },
  {
    id: 'G180477',

    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    grade: 'C+',
    percentage: '50% - 60%',
    points: '2'
  },
  {
    id: 'G180476',

    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    grade: 'C',
    percentage: '40% - 50%',
    points: '1'
  },
  {
    id: 'G180475',

    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    grade: 'F',
    percentage: '35% - 40%',
    points: '0'
  },
  {
    id: 'G180474',

    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    grade: 'D',
    percentage: 'Below 35%',
    points: '9'
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
export const gradeOptions = ['O', 'A+', 'A', 'B', 'C', 'D', 'F']
export const marksfromOptions = ['90', '80', '70', '60']
export const marksuptoOptions = ['100']
export const pointOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const percentageOptions = [
  '90% - 100%',
  '80% - 90%',
  '70% - 80%',
  '60% - 70%',
  '50% - 60%',
  '40% - 50%',
  '35% - 40%',
  'Below 35%'
]
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  grade: '',
  marksfrom: '',
  marksupto: '',
  percentage: '',
  description: '',
  points: '',
  status: 'Active'
}
