import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '@src/pages/folder/page'

export const Route = createLazyFileRoute('/$folder/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Page />
    </div>
  )
}
