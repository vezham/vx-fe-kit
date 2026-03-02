import { createLazyFileRoute } from '@tanstack/react-router'

import Archive from '../../pages/archive'

export const Route = createLazyFileRoute('/archive/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Archive />
    </div>
  )
}
