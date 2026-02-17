import { createLazyFileRoute } from '@tanstack/react-router'

import TrashPage from '../../../pages/trash'

export const Route = createLazyFileRoute('/(home)/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <TrashPage />
    </div>
  )
}
