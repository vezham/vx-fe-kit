import { createLazyFileRoute } from '@tanstack/react-router'

import { Recent } from '../../../pages/contacts/recently-added'

export const Route = createLazyFileRoute('/(home)/recent/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Recent />
    </div>
  )
}
