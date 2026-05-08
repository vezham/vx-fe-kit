import {
  makeAttendanceConfig,
  makeDailyAttendanceRows,
  option
} from '../_shared/data'

export const dailyAttendanceConfig = makeAttendanceConfig({
  key: 'daily-attendance',
  title: 'Daily Attendance List',
  ariaLabel: 'Daily attendance',
  columns: [
    { key: 'className', label: 'Class', allowsSorting: true },
    { key: 'section', label: 'Section', allowsSorting: true },
    { key: 'totalPresent', label: 'Total Present', allowsSorting: true },
    { key: 'totalAbsent', label: 'Total Absent', allowsSorting: true },
    { key: 'presentPercent', label: 'Present %', allowsSorting: true },
    { key: 'absentPercent', label: 'Absent %', allowsSorting: true }
  ],
  rows: makeDailyAttendanceRows(),
  filters: [
    option('className', 'Class', [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX'
    ]),
    option('section', 'Section', ['A', 'B', 'C'])
  ],
  initialColumn: 'className',
  tableMinWidth: 900
})
