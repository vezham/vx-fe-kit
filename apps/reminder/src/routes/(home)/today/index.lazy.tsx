import { createLazyFileRoute } from '@tanstack/react-router'

import TodaySection from '../../../pages/today'

export const Route = createLazyFileRoute('/(home)/today/')({
  component: RouteComponent
})

function RouteComponent() {
  return <TodaySection />
}
