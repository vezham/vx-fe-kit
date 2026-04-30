import { createLazyFileRoute } from '@tanstack/react-router'

import HomeWorkPage from '../../../pages/academic1/homework'

export const Route = createLazyFileRoute('/academic1/homework/')({
  component: HomeWorkPage
})
