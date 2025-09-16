import { createLazyFileRoute } from '@tanstack/react-router'

import ForYou from '../../pages/reports/reportTabs/nexus_test/ForYouPage'

export const Route = createLazyFileRoute('/reports/nexus')({
  component: () => <ForYou />
})
