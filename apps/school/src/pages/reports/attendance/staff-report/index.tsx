import AttendanceTablePage from '../_shared/attendance-table-page'
import { staffReportConfig } from './data'

export default function StaffReportPage() {
  return <AttendanceTablePage config={staffReportConfig} />
}
