import { createLazyFileRoute } from '@tanstack/react-router'

import DetailPage from '../../../pages/worldclock/details'

export const Route = createLazyFileRoute('/worldclock/$clockId/')({
  component: () => <DetailPage />
})
