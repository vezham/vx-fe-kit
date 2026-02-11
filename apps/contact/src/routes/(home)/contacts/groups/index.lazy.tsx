import { createLazyFileRoute } from '@tanstack/react-router'

import { GroupSection } from '../../../../pages/contacts/groups'

export const Route = createLazyFileRoute('/(home)/contacts/groups/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <GroupSection />
    </div>
  )
}
