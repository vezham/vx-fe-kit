import { createLazyFileRoute } from '@tanstack/react-router'

import AllClassesPage from '../../../../pages/academic1/classes/all-classes'

export const Route = createLazyFileRoute('/academic1/classes/allclasses/')({
  component: AllClassesPage
})
