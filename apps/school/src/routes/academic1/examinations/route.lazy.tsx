import { createLazyFileRoute } from '@tanstack/react-router'

import ExaminationsLayoutPage from '../../../pages/academic1/examinations/layout'

export const Route = createLazyFileRoute('/academic1/examinations')({
  component: ExaminationsLayoutPage
})
