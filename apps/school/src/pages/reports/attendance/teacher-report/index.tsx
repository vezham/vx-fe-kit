import AttendanceTablePage from '../_shared/attendance-table-page'
import { teacherReportConfig } from './data'

export default function TeacherReportPage() {
  return <AttendanceTablePage config={teacherReportConfig} />
}
