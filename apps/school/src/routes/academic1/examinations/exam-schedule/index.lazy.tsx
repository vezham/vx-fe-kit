import { createLazyFileRoute } from '@tanstack/react-router'

import ExamSchedulePage from '../../../../pages/academic1/examinations/exam-schedule'

export const Route = createLazyFileRoute(
  '/academic1/examinations/exam-schedule/'
)({
  component: ExamSchedulePage
})
