import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu/layout'
import Sidebar from '../../../pages/sidebar'

export const Route = createLazyFileRoute('/reminders/$reminderId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>remainder Id</div>
}
