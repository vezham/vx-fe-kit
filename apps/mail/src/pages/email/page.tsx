import { notFound, useParams } from '@tanstack/react-router'

import { EmailDetail } from '../../components/email-detail'
import { THREADS, getThread } from '../../data/email'

export function generateStaticParams() {
  return THREADS.map(thread => ({
    emailId: thread.id,
    folder: thread.folderId
  }))
}

export default function Page() {
  const { emailId, folder } = useParams({ strict: false })
  const thread = getThread(emailId || '')

  if (!thread) return notFound()

  return <EmailDetail backHref={`/${folder}`} thread={thread} />
}
