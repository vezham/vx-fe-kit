import AttendanceTablePage from '../_shared/attendance-table-page'
import { studentDayWiseConfig } from './data'

export default function StudentDayWisePage() {
  return <AttendanceTablePage config={studentDayWiseConfig} />
}
