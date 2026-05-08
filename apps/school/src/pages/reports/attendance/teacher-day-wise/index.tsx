import AttendanceTablePage from '../_shared/attendance-table-page'
import { teacherDayWiseConfig } from './data'

export default function TeacherDayWisePage() {
  return <AttendanceTablePage config={teacherDayWiseConfig} />
}
