import type { SortDescriptor } from '@vezham/react/v3'

import type {
  AttendancePageConfig,
  AttendanceStatus,
  DatePresetKey,
  ReportColumn,
  ReportRow
} from './types'

export const rowCountOptions = ['10', '25', '50']
export const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'custom', label: 'Custom Range' }
]
export const statusLegend: {
  status: AttendanceStatus
  label: string
  icon: string
}[] = []

const columns: ReportColumn[] = [
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'section', label: 'Section', allowsSorting: true },
  { key: 'teacher', label: 'Class Teacher', allowsSorting: true },
  { key: 'students', label: 'Students', allowsSorting: true },
  { key: 'capacity', label: 'Capacity', allowsSorting: true },
  { key: 'createdAt', label: 'Created Date', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'class-report-1',
    className: 'I',
    section: 'A',
    teacher: 'Teresa',
    students: 38,
    capacity: 42,
    createdAt: '2024-05-24'
  },
  {
    id: 'class-report-2',
    className: 'II',
    section: 'B',
    teacher: 'Daniel',
    students: 35,
    capacity: 40,
    createdAt: '2024-05-22'
  },
  {
    id: 'class-report-3',
    className: 'III',
    section: 'A',
    teacher: 'Hellana',
    students: 41,
    capacity: 45,
    createdAt: '2024-05-20'
  },
  {
    id: 'class-report-4',
    className: 'IV',
    section: 'C',
    teacher: 'Morgan',
    students: 32,
    capacity: 38,
    createdAt: '2024-05-18'
  },
  {
    id: 'class-report-5',
    className: 'V',
    section: 'A',
    teacher: 'Aaron',
    students: 44,
    capacity: 48,
    createdAt: '2024-05-15'
  }
]

export const classReportsConfig = makeConfig({
  key: 'class-reports',
  title: 'Class Report List',
  ariaLabel: 'Class reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('section', 'Section', ['A', 'B', 'C'])
  ],
  initialColumn: 'className',
  tableMinWidth: 960
})

function makeConfig(config: {
  key: string
  title: string
  ariaLabel: string
  columns: ReportColumn[]
  rows: ReportRow[]
  filters: AttendancePageConfig['filters']
  initialColumn: string
  tableMinWidth: number
  showStatusLegend?: boolean
}): AttendancePageConfig {
  const initialSort = {
    column: config.initialColumn,
    direction: 'ascending'
  } satisfies SortDescriptor

  return {
    ...config,
    initialSort,
    sortOptions: [
      { key: 'ascending', label: 'A-Z', descriptor: initialSort },
      {
        key: 'descending',
        label: 'Z-A',
        descriptor: {
          column: config.initialColumn,
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
    ]
  }
}

function option(key: string, label: string, values: string[]) {
  return { key, label, values }
}
