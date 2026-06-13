import { createLazyFileRoute } from '@tanstack/react-router'

import { PortfolioPage } from '@/src/views/portfolio-page'

export const Route = createLazyFileRoute('/portfolio/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <PortfolioPage />
    </div>
  )
}
