import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import { ViewMailDrawer } from '../../../../pages/mail/inbox/view-mail'
import { emailData } from '../../../../store/data'

export const Route = createLazyFileRoute('/mail/inbox/$inboxId/')({
  component: RouteComponent
})

function RouteComponent() {
  const { inboxId } = Route.useParams()
  const navigate = useNavigate()

  const selectedEmail =
    Object.values(emailData)
      .flat()
      .find(email => email.id === inboxId) || null

  return (
    <ViewMailDrawer
      isOpen={!!selectedEmail}
      email={selectedEmail}
      onOpenChange={open => {
        if (!open) {
          navigate({ to: '/mail/inbox' })
        }
      }}
    />
  )
}
