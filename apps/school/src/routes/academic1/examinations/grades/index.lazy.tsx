import { createLazyFileRoute } from '@tanstack/react-router'

import GradesPage from '../../../../pages/academic1/examinations/grades'

export const Route = createLazyFileRoute('/academic1/examinations/grades/')({
  component: GradesPage
})
