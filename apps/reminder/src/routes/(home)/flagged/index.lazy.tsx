import { createLazyFileRoute } from '@tanstack/react-router'

import FlagSection from '../../../pages/flagged'

export const Route = createLazyFileRoute('/(home)/flagged/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <FlagSection />
    </div>
  )
}
