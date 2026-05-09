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
  { key: 'exam', label: 'Exam', allowsSorting: true },
  { key: 'mark', label: 'Marks', allowsSorting: true },
  { key: 'grade', label: 'Grade', allowsSorting: true },
  { key: 'createdAt', label: 'Created Date', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'grade-report-1',
    student: 'Janet',
    className: 'III',
    exam: 'Final',
    mark: 476,
    grade: 'A+',
    createdAt: '2024-05-24'
  },
  {
    id: 'grade-report-2',
    student: 'Veronica',
    className: 'IV',
    exam: 'Half Yearly',
    mark: 441,
    grade: 'A',
    createdAt: '2024-05-22'
  },
  {
    id: 'grade-report-3',
    student: 'Kathleen',
    className: 'II',
    exam: 'Quarterly',
    mark: 398,
    grade: 'B+',
    createdAt: '2024-05-20'
  },
  {
    id: 'grade-report-4',
    student: 'Joann',
    className: 'I',
    exam: 'Final',
    mark: 422,
    grade: 'A',
    createdAt: '2024-05-18'
  },
  {
    id: 'grade-report-5',
    student: 'Lisa',
    className: 'V',
    exam: 'Final',
    mark: 386,
    grade: 'B',
    createdAt: '2024-05-15'
  }
]

export const gradeReportsConfig = makeConfig({
  key: 'grade-reports',
  title: 'Grade Report List',
  ariaLabel: 'Grade reports',
  columns,
  rows,
  filters: [
    option('exam', 'Exam', ['Quarterly', 'Half Yearly', 'Final']),
    option('grade', 'Grade', ['A+', 'A', 'B+', 'B'])
  ],
  initialColumn: 'grade',
  tableMinWidth: 900
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
