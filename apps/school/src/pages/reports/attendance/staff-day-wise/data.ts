import {
  makeAttendanceConfig,
  makeStaffDayWiseRows,
  option,
  staffDayWiseColumns
} from '../_shared/data'

export const staffDayWiseConfig = makeAttendanceConfig({
  key: 'staff-day-wise',
  title: 'Staff Day Wise List',
  ariaLabel: 'Staff day wise',
  columns: staffDayWiseColumns,
  rows: makeStaffDayWiseRows(),
  filters: [
    option('department', 'Department', [
      'Management',
      'Finance',
      'Admin',
      'Transport',
      'Library'
    ]),
    option('attendance', 'Attendance', [
      'Present',
      'Absent',
      'Late',
      'Half Day'
    ])
  ],
  initialColumn: 'staffId',
  tableMinWidth: 960
})
