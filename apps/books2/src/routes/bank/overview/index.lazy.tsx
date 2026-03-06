import { createLazyFileRoute } from '@tanstack/react-router'

import Bank from '../../../pages/banks'

export const Route = createLazyFileRoute('/bank/overview/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Bank />
    </div>
  )
}
