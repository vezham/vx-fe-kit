import { createLazyFileRoute } from '@tanstack/react-router'

import ReactionsPage from '../../../pages/academic1/reactions'

export const Route = createLazyFileRoute('/academic1/reasons/')({
  component: ReactionsPage
})
