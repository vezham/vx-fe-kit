import {
  makeAttendanceConfig,
  makeStudentsAttendanceTypeRows,
  option,
  studentAttendanceTypeColumns
} from '../_shared/data'

export const studentsAttendanceTypeConfig = makeAttendanceConfig({
  key: 'students-attendance-type',
  title: 'Students Attendance Type List',
  ariaLabel: 'Students attendance type',
  columns: studentAttendanceTypeColumns,
  rows: makeStudentsAttendanceTypeRows(),
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
    option('count', 'Count', ['15', '22', '24'])
  ],
  initialColumn: 'admissionNo',
  tableMinWidth: 960
})
