import { createLazyFileRoute } from '@tanstack/react-router'

import DetailPage from '../../../../pages/worldclock/details'

export const Route = createLazyFileRoute('/(home)/worldclock/$clockId/')({
  component: () => <DetailPage />
})
