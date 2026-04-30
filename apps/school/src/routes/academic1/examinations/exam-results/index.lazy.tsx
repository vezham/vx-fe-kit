import { createLazyFileRoute } from '@tanstack/react-router'

import ExamResultsPage from '../../../../pages/academic1/examinations/exam-results'

export const Route = createLazyFileRoute(
  '/academic1/examinations/exam-results/'
)({
  component: ExamResultsPage
})
