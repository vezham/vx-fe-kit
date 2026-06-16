import { createLazyFileRoute } from '@tanstack/react-router'

import { LibraryPage } from '@/src/pages/library'

export const Route = createLazyFileRoute('/library/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <LibraryPage />
    </div>
  )
}
