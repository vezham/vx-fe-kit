import { createLazyFileRoute } from '@tanstack/react-router'

import Archive from '../../../pages/archive'

export const Route = createLazyFileRoute('/(home)/archive/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Archive />
    </div>
  )
}
