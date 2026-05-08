import {
  makeAttendanceConfig,
  makeStudentDayWiseRows,
  option,
  studentDayWiseColumns
} from '../_shared/data'

export const studentDayWiseConfig = makeAttendanceConfig({
  key: 'student-day-wise',
  title: 'Student Day Wise List',
  ariaLabel: 'Student day wise',
  columns: studentDayWiseColumns,
  rows: makeStudentDayWiseRows(),
  filters: [
    option('attendance', 'Attendance', [
      'Present',
      'Absent',
      'Late',
      'Half Day'
    ])
  ],
  initialColumn: 'serialNo',
  tableMinWidth: 900
})
