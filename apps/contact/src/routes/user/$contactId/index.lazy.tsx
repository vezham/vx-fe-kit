import { createLazyFileRoute } from '@tanstack/react-router'

import ContactDetail from '../../../pages/contact/details'

export const Route = createLazyFileRoute('/user/$contactId/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ContactDetail />
    </div>
  )
}
