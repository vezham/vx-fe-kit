import { createLazyFileRoute } from '@tanstack/react-router'

import { AllSection } from '../../../../pages/contacts/all'

export const Route = createLazyFileRoute('/(home)/contacts/all/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <AllSection />
    </div>
  )
}
