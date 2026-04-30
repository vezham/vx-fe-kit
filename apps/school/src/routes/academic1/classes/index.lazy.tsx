import { createLazyFileRoute } from '@tanstack/react-router'

import ClassesPage from '../../../pages/academic1/classes'

export const Route = createLazyFileRoute('/academic1/classes/')({
  component: ClassesPage
})
