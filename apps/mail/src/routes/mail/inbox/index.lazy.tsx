import { createLazyFileRoute } from '@tanstack/react-router'

import { EmailList } from '../../../pages/mail'
import { EmailDrawer } from '../../../pages/mail/drawer'
import { Email } from '../../../pages/mail/types'
import { emailData } from '../../../store/data'
import { useInboxDrawerQuery } from '../../../utils/queryOptions'

export const Route = createLazyFileRoute('/mail/inbox/')({
  component: RouteComponent
})

function RouteComponent() {
  const { isOpen, id, openDrawer, closeDrawer } = useInboxDrawerQuery()

  const selectedEmail = id
    ? Object.values(emailData)
        .flat()
        .find(email => email.id === id) || null
    : null

  return (
    <>
      <EmailList
        emails={emailData}
        onEmailClick={(email: Email) => openDrawer(email.id)}
      />

      <EmailDrawer
        isOpen={isOpen}
        onOpenChange={open => {
          if (!open) closeDrawer()
        }}
        email={selectedEmail}
      />
    </>
  )
}
