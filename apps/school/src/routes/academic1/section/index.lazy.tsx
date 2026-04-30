import { createLazyFileRoute } from '@tanstack/react-router'

import SectionPage from '../../../pages/academic1/section'

export const Route = createLazyFileRoute('/academic1/section/')({
  component: SectionPage
})
