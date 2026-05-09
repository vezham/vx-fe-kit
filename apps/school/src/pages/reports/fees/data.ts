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
  { key: 'receiptNo', label: 'Receipt No', allowsSorting: true, type: 'link' },
  { key: 'student', label: 'Student Name', allowsSorting: true },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'amount', label: 'Amount', allowsSorting: true },
  { key: 'status', label: 'Status', allowsSorting: true },
  { key: 'createdAt', label: 'Created Date', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'fees-report-1',
    receiptNo: 'RC1024',
    student: 'Janet',
    className: 'III',
    amount: '$1,240',
    status: 'Paid',
    createdAt: '2024-05-24'
  },
  {
    id: 'fees-report-2',
    receiptNo: 'RC1023',
    student: 'Veronica',
    className: 'IV',
    amount: '$980',
    status: 'Pending',
    createdAt: '2024-05-22'
  },
  {
    id: 'fees-report-3',
    receiptNo: 'RC1022',
    student: 'Kathleen',
    className: 'II',
    amount: '$1,120',
    status: 'Paid',
    createdAt: '2024-05-20'
  },
  {
    id: 'fees-report-4',
    receiptNo: 'RC1021',
    student: 'Joann',
    className: 'I',
    amount: '$760',
    status: 'Overdue',
    createdAt: '2024-05-18'
  },
  {
    id: 'fees-report-5',
    receiptNo: 'RC1020',
    student: 'Lisa',
    className: 'V',
    amount: '$1,340',
    status: 'Paid',
    createdAt: '2024-05-15'
  }
]

export const feesReportsConfig = makeConfig({
  key: 'fees-reports',
  title: 'Fees Report List',
  ariaLabel: 'Fees reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('status', 'Status', ['Paid', 'Pending', 'Overdue'])
  ],
  initialColumn: 'receiptNo',
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
