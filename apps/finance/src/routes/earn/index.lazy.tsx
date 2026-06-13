import { createLazyFileRoute } from '@tanstack/react-router'

import { EarnPage } from '@/src/views/earn-page'

export const Route = createLazyFileRoute('/earn/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <EarnPage />
    </div>
  )
}
