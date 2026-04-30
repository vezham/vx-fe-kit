import { createLazyFileRoute } from '@tanstack/react-router'

import ExamAttendancePage from '../../../../pages/academic1/examinations/exam-attendance'

export const Route = createLazyFileRoute(
  '/academic1/examinations/exam-attendance/'
)({
  component: ExamAttendancePage
})
