import AttendanceTablePage from '../_shared/attendance-table-page'
import { staffDayWiseConfig } from './data'

export default function StaffDayWisePage() {
  return <AttendanceTablePage config={staffDayWiseConfig} />
}
