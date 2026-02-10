import { createLazyFileRoute } from '@tanstack/react-router'

import ListPage from '../../../pages/list'

export const Route = createLazyFileRoute('/(home)/lists/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ListPage />
    </div>
  )
}
