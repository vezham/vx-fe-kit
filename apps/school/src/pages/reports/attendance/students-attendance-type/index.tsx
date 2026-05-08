import AttendanceTablePage from '../_shared/attendance-table-page'
import { studentsAttendanceTypeConfig } from './data'

export default function StudentsAttendanceTypePage() {
  return <AttendanceTablePage config={studentsAttendanceTypeConfig} />
}
