import { createLazyFileRoute } from '@tanstack/react-router'

import Reports from '../layouts/reports/index'

export const Route = createLazyFileRoute('/reports')({
  component: () => <Reports />
})
