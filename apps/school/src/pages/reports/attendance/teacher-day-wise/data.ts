import {
  makeAttendanceConfig,
  makeTeacherDayWiseRows,
  option,
  teacherDayWiseColumns
} from '../_shared/data'

export const teacherDayWiseConfig = makeAttendanceConfig({
  key: 'teacher-day-wise',
  title: 'Teacher Day Wise List',
  ariaLabel: 'Teacher day wise',
  columns: teacherDayWiseColumns,
  rows: makeTeacherDayWiseRows(),
  filters: [
    option('subject', 'Subject', [
      'Physics',
      'Computer',
      'English',
      'Spanish',
      'Env Science',
      'Chemistry',
      'Maths',
      'Biology',
      'Economics',
      'Finance'
    ]),
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
