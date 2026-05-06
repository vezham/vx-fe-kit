import type { SortDescriptor } from '@vezham/react/v3'

import type {
  ClassFormState,
  ClassRow,
  ClassStatus,
  DatePresetKey
} from './types'

export const initialRows: ClassRow[] = [
  {
    id: 'RT167648',
    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    date: '	13 May 2024',
    duration: '3hrs',
    subject: 'English',
    maximum: '100',
    classroom: '101',
    minimum: '35'
  },
  {
    id: 'RT167647',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    date: '	14 May 2024',
    duration: '3hrs',
    subject: 'Math',
    maximum: '100',
    classroom: '104',
    minimum: '35'
  },
  {
    id: 'RT167646',
    starttime: '12.00 AM',
    endtime: '01.15 PM',
    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    date: '	15 May 2024',
    duration: '3hrs',
    subject: 'Physics',
    maximum: '100',
    classroom: '103',
    minimum: '35'
  },
  {
    id: 'RT167645',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    date: '	16 May 2024',
    duration: '3hrs',
    subject: 'Chemistry',
    maximum: '100',
    classroom: '105',
    minimum: '35'
  },
  {
    id: 'RT167644',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    date: '	17 May 2024',
    duration: '3hrs',
    subject: 'Biology',
    maximum: '100',
    classroom: '106',
    minimum: '35'
  },
  {
    id: 'RT167643',

    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    date: '	18 May 2024',
    duration: '3hrs',
    subject: 'Higher Math',
    maximum: '100',
    classroom: '102',
    minimum: '35'
  },
  {
    id: 'RT167642',

    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    date: '	19 May 2024',
    duration: '3hrs',
    subject: 'Information Technology',
    maximum: '100',
    classroom: '107',
    minimum: '35'
  },
  {
    id: 'RT167641',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    date: '	20 May 2024',
    duration: '3hrs',
    subject: 'Moral Education',
    maximum: '100',
    classroom: '101',
    minimum: '35'
  },
  {
    id: 'RT167640',
    starttime: '12.00 PM',
    endtime: '01.15 PM',
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    date: '	21 May 2024',
    duration: '3hrs',
    subject: 'Finance',
    maximum: '100',
    classroom: '106',
    minimum: '35'
  },
  {
    id: 'RT167639',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    date: '	22 May 2024',
    duration: '3hrs',
    subject: 'Economics',
    maximum: '100',
    classroom: '104',
    minimum: '35'
  },
  {
    id: 'RT167638',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Active',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21',
    date: '	23 May 2024',
    duration: '3hrs',
    subject: 'Math',
    maximum: '100',
    classroom: '103',
    minimum: '35'
  },
  {
    id: 'RT167637',

    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Inactive',
    createdAt: '2027-02-14',
    viewedAt: '2026-04-20',
    date: '	24 May 2024',
    duration: '3hrs',
    subject: 'Physics',
    maximum: '100',
    classroom: '101',
    minimum: '35'
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
export const classOptions = ['I', 'II', 'III', 'IV', 'V']
export const sectionOptions = ['A', 'B', 'C', 'D', 'E']
export const durationOptions = [
  'Erickson',
  'Joseph',
  'James',
  'Henry',
  'Fathima'
]
export const roomOptions = [
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
export const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
export const examdateOptions = [
  '13 May 2024',
  '14 May 2024',
  '15 May 2024',
  '16 May 2024'
]

export const starttimeOptions = [
  '09.30 AM',
  '10.30 AM',
  '11.30 AM',
  '12.30 PM',
  '01.30 PM',
  '02.30 PM'
]
export const endtimeOptions = [
  '12.30 PM',
  '01.30 PM',
  '02.30 PM',
  '03.30 PM',
  '04.30 PM',
  '05.30 PM'
]
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  subject: '',
  date: '',
  starttime: '',
  endtime: '',
  duration: '',
  classroom: '',
  maximum: '',
  minimum: '',
  status: 'Active'
}
