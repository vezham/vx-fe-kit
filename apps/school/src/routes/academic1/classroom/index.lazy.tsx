import { createLazyFileRoute } from '@tanstack/react-router'

import ClassroomPage from '../../../pages/academic1/classroom'

export const Route = createLazyFileRoute('/academic1/classroom/')({
  component: ClassroomPage
})
