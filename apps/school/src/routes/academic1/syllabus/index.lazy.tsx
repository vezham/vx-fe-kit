import { createLazyFileRoute } from '@tanstack/react-router'

import SyllabusPage from '../../../pages/academic1/syllabus'

export const Route = createLazyFileRoute('/academic1/syllabus/')({
  component: SyllabusPage
})
