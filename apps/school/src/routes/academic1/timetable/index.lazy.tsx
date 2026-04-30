import { createLazyFileRoute } from '@tanstack/react-router'

import TimeTablePage from '../../../pages/academic1/timetable'

export const Route = createLazyFileRoute('/academic1/timetable/')({
  component: TimeTablePage
})
