import { createLazyFileRoute } from '@tanstack/react-router'

import Bank from '../../pages/banks'

export const Route = createLazyFileRoute('/bank/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Bank />
    </div>
  )
}
