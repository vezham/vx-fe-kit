import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '@src/pages/email/page'

export const Route = createLazyFileRoute('/$folder/$emailId/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Page />
    </div>
  )
}
