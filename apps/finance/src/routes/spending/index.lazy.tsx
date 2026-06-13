import { createLazyFileRoute } from '@tanstack/react-router'

import { SpendingPage } from '@/src/views/spending-page'

export const Route = createLazyFileRoute('/spending/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <SpendingPage />
    </div>
  )
}
