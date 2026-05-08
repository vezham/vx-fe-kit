import AttendanceTablePage from '../_shared/attendance-table-page'
import { attendanceReportConfig } from './data'

export default function AttendanceReportPage() {
  return <AttendanceTablePage config={attendanceReportConfig} />
}
