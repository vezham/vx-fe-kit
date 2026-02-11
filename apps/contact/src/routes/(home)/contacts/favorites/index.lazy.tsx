import { createLazyFileRoute } from '@tanstack/react-router'

import { Favorites } from '../../../../pages/contacts/favorites'

export const Route = createLazyFileRoute('/(home)/contacts/favorites/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Favorites />
    </div>
  )
}
