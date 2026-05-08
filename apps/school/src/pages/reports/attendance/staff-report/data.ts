import {
  makeAttendanceConfig,
  makeSummaryRows,
  option,
  staffPeople,
  summaryColumns
} from '../_shared/data'

export const staffReportConfig = makeAttendanceConfig({
  key: 'staff-report',
  title: 'Staff Report List',
  ariaLabel: 'Staff report',
  columns: summaryColumns.map(column =>
    column.key === 'person' ? { ...column, label: 'Staff / Date' } : column
  ),
  rows: makeSummaryRows(staffPeople),
  filters: [
    option('attendance', 'Attendance', [
      'Present',
      'Absent',
      'Late',
      'Halfday',
      'Holiday'
    ])
  ],
  initialColumn: 'person',
  tableMinWidth: 1280,
  showStatusLegend: true
})
