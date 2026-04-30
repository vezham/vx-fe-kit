import { createLazyFileRoute } from '@tanstack/react-router'

import ClassesLayoutPage from '../../../pages/academic1/classes/layout'

export const Route = createLazyFileRoute('/academic1/classes')({
  component: ClassesLayoutPage
})
