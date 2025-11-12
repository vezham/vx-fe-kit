import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/purchase/purchaserReport/purchaserReport'

export const Route = createLazyFileRoute('/reports/purchase/purchaser_reports')(
  {
    component: () => <Page />
  }
)
