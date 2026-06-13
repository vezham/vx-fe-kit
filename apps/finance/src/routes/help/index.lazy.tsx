import { createLazyFileRoute } from '@tanstack/react-router'

import { HelpPage } from '@/src/views/help-page'

export const Route = createLazyFileRoute('/help/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <HelpPage />
    </div>
  )
}
