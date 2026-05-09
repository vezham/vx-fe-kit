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
  {
    key: 'admissionNo',
    label: 'Admission No',
    allowsSorting: true,
    type: 'link'
  },
  { key: 'student', label: 'Student Name', allowsSorting: true },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'parent', label: 'Parent Name', allowsSorting: true },
  { key: 'status', label: 'Status', allowsSorting: true },
  { key: 'createdAt', label: 'Created Date', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'student-report-1',
    admissionNo: 'AD9892434',
    student: 'Janet',
    className: 'III',
    parent: 'Mary',
    status: 'Active',
    createdAt: '2024-05-24'
  },
  {
    id: 'student-report-2',
    admissionNo: 'AD9892433',
    student: 'Veronica',
    className: 'IV',
    parent: 'Michael',
    status: 'Active',
    createdAt: '2024-05-22'
  },
  {
    id: 'student-report-3',
    admissionNo: 'AD9892432',
    student: 'Kathleen',
    className: 'II',
    parent: 'Jessie',
    status: 'Inactive',
    createdAt: '2024-05-20'
  },
  {
    id: 'student-report-4',
    admissionNo: 'AD9892431',
    student: 'Joann',
    className: 'I',
    parent: 'Robert',
    status: 'Active',
    createdAt: '2024-05-18'
  },
  {
    id: 'student-report-5',
    admissionNo: 'AD9892430',
    student: 'Lisa',
    className: 'V',
    parent: 'Colleen',
    status: 'Active',
    createdAt: '2024-05-15'
  }
]

export const studentReportsConfig = makeConfig({
  key: 'student-reports',
  title: 'Student Report List',
  ariaLabel: 'Student reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('status', 'Status', ['Active', 'Inactive'])
  ],
  initialColumn: 'student',
  tableMinWidth: 1040
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
