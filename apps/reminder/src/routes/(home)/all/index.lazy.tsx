import { createLazyFileRoute } from '@tanstack/react-router'

import AllSection from '../../../pages/all'

export const Route = createLazyFileRoute('/(home)/all/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <AllSection />
    </div>
  )
}
