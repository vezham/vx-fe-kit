import type { SortDescriptor } from '@vezham/react-v3'

import type {
  ClassFormState,
  ClassRow,
  ClassStatus,
  DatePresetKey
} from './types'

export const initialRows: ClassRow[] = [
  {
    id: 'SE167645',
    section: 'A',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    classes: 'I',
    subject: 'I, C English'
  },
  {
    id: 'SE167644',
    section: 'B',

    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    classes: 'I',
    subject: '	III, A Maths'
  },
  {
    id: 'SE167643',
    section: 'C',

    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    classes: 'II',
    subject: 'II, A English'
  },
  {
    id: 'SE167642',
    section: 'A',

    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    classes: 'II',
    subject: '	IV, A Physics'
  },
  {
    id: 'SE167641',
    section: 'B',

    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    classes: 'II',
    subject: 'V, A Chemistry'
  },
  {
    id: 'SE167640',
    section: 'C',

    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    classes: 'IV',
    subject: '	III, B Maths'
  },
  {
    id: 'SE167639',
    section: 'C',

    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    classes: 'III',
    subject: 'IV, B Chemistry'
  },
  {
    id: 'SE167638',
    section: 'A',

    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    classes: 'III',
    subject: '	I, B Maths'
  },
  {
    id: 'SE167637',
    section: 'A',

    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    classes: 'III',
    subject: '	VI, B Chemistry'
  },
  {
    id: 'SE167636',
    section: 'B',

    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    classes: 'IV',
    subject: '	IV, D Maths'
  },
  {
    id: 'SE167636',
    section: 'A',

    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    classes: 'V',
    subject: '	I, B Maths'
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
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    column: 'viewedAt'
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    column: 'createdAt'
  }
] as const

export const sortOrderOptions = [
  {
    key: 'ascending',
    label: 'Ascending',
    direction: 'ascending',
    icon: 'lucide:arrow-up-wide-narrow'
  },
  {
    key: 'descending',
    label: 'Descending',
    direction: 'descending',
    icon: 'lucide:arrow-down-wide-narrow'
  }
] as const satisfies readonly {
  key: string
  label: string
  direction: SortDescriptor['direction']
  icon: string
}[]

export const rowCountOptions = ['5', '10', '25', '50']
export const classOptions = ['I', 'II', 'III']
export const sectionOptions = ['A', 'B', 'C']
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  section: '',
  status: 'Active',
  classes: '',
  subject: ''
}
