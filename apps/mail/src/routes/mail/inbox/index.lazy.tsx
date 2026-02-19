import { createLazyFileRoute } from '@tanstack/react-router'

import { MailList } from '../../../pages/mail/inbox'
import { emailData } from '../../../store/data'

export const Route = createLazyFileRoute('/mail/inbox/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  return (
    <MailList
      emails={emailData}
      onEmailClick={email => {
        navigate({
          to: `/mail/inbox/${email.id}`
        })
      }}
    />
  )
}
