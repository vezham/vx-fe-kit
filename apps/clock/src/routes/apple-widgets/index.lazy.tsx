import { createLazyFileRoute } from '@tanstack/react-router'

import AppleWidgetPage from '../../pages/apple-widgets'

export const Route = createLazyFileRoute('/apple-widgets/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <AppleWidgetPage />
    </div>
  )
}
