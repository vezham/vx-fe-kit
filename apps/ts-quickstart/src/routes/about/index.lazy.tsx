import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/about'

export const Route = createLazyFileRoute('/about/')({
  component: RouteComponent
})

function RouteComponent() {
  return <Page />
}
