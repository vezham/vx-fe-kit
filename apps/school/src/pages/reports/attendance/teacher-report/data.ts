import {
  makeAttendanceConfig,
  makeSummaryRows,
  option,
  summaryColumns,
  teacherPeople
} from '../_shared/data'

export const teacherReportConfig = makeAttendanceConfig({
  key: 'teacher-report',
  title: 'Attendance Report List',
  ariaLabel: 'Teacher report',
  columns: summaryColumns,
  rows: makeSummaryRows(teacherPeople),
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
