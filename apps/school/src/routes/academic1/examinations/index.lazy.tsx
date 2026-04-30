import { createLazyFileRoute } from '@tanstack/react-router'

import ExaminationsPage from '../../../pages/academic1/examinations'

export const Route = createLazyFileRoute('/academic1/examinations/')({
  component: ExaminationsPage
})
