import { createLazyFileRoute } from '@tanstack/react-router'

import ClassRoutinePage from '../../../pages/academic1/class-routine'

export const Route = createLazyFileRoute('/academic1/classroutine/')({
  component: ClassRoutinePage
})
