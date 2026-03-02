import { createLazyFileRoute } from '@tanstack/react-router'

import ArchivePage from '../../pages/archive'

export const Route = createLazyFileRoute('/archived/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ArchivePage />
    </div>
  )
}
