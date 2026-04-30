import { createLazyFileRoute } from '@tanstack/react-router'

import SubjectPage from '../../../pages/academic1/subject'

export const Route = createLazyFileRoute('/academic1/subject/')({
  component: SubjectPage
})
