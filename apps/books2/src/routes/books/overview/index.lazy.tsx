import { createLazyFileRoute } from '@tanstack/react-router'

import Overview from '../../../pages/books/overview'

export const Route = createLazyFileRoute('/books/overview/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="p-5">
      <Overview />
    </div>
  )
}
