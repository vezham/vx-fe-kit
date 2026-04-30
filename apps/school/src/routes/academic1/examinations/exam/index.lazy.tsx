import { createLazyFileRoute } from '@tanstack/react-router'

import ExamPage from '../../../../pages/academic1/examinations/exam'

export const Route = createLazyFileRoute('/academic1/examinations/exam/')({
  component: ExamPage
})
