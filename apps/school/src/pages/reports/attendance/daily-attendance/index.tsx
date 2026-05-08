import AttendanceTablePage from '../_shared/attendance-table-page'
import { dailyAttendanceConfig } from './data'

export default function DailyAttendancePage() {
  return <AttendanceTablePage config={dailyAttendanceConfig} />
}
