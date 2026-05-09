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
  { key: 'student', label: 'Student Name', allowsSorting: true },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'leaveType', label: 'Leave Type', allowsSorting: true },
  { key: 'days', label: 'Days', allowsSorting: true },
  { key: 'status', label: 'Status', allowsSorting: true },
  { key: 'createdAt', label: 'Created Date', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'leave-report-1',
    student: 'Janet',
    className: 'III',
    leaveType: 'Sick Leave',
    days: 2,
    status: 'Approved',
    createdAt: '2024-05-24'
  },
  {
    id: 'leave-report-2',
    student: 'Veronica',
    className: 'IV',
    leaveType: 'Personal',
    days: 1,
    status: 'Pending',
    createdAt: '2024-05-22'
  },
  {
    id: 'leave-report-3',
    student: 'Kathleen',
    className: 'II',
    leaveType: 'Medical',
    days: 3,
    status: 'Approved',
    createdAt: '2024-05-20'
  },
  {
    id: 'leave-report-4',
    student: 'Joann',
    className: 'I',
    leaveType: 'Family Event',
    days: 1,
    status: 'Rejected',
    createdAt: '2024-05-18'
  },
  {
    id: 'leave-report-5',
    student: 'Lisa',
    className: 'V',
    leaveType: 'Sick Leave',
    days: 2,
    status: 'Approved',
    createdAt: '2024-05-15'
  }
]

export const leaveReportsConfig = makeConfig({
  key: 'leave-reports',
  title: 'Leave Report List',
  ariaLabel: 'Leave reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('status', 'Status', ['Approved', 'Pending', 'Rejected'])
  ],
  initialColumn: 'student',
  tableMinWidth: 980
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
