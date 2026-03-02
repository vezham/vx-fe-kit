import { createLazyFileRoute } from '@tanstack/react-router'

import NotesPage from '../../pages/notes'

export const Route = createLazyFileRoute('/all/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <NotesPage />
    </div>
  )
}
