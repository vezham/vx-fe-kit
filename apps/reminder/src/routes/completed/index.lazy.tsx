import { createLazyFileRoute } from '@tanstack/react-router'

import Completed from '../../pages/completed'

export const Route = createLazyFileRoute('/completed/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Completed />
    </div>
  )
}
