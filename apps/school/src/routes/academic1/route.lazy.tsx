import { createLazyFileRoute } from '@tanstack/react-router'

import AcademicLayoutPage from '../../pages/academic1/layout'

export const Route = createLazyFileRoute('/academic1')({
  component: AcademicLayoutPage
})
