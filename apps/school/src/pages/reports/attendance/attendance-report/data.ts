import {
  makeAttendanceConfig,
  makeSummaryRows,
  option,
  studentPeople,
  summaryColumns
} from '../_shared/data'

export const attendanceReportConfig = makeAttendanceConfig({
  key: 'attendance-report',
  title: 'Attendance Report List',
  ariaLabel: 'Attendance report',
  columns: summaryColumns.map(column =>
    column.key === 'person' ? { ...column, label: 'Student / Date' } : column
  ),
  rows: makeSummaryRows(studentPeople.slice(0, 10)),
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
