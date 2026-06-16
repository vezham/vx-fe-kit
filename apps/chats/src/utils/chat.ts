import { DEFAULT_CHAT_THREAD_ID } from '../data/data'
import { ChatActivePage } from '../data/types'
import { CHAT_THREADS } from '../store/useChats/data'

export function getChatThread(chatId: string) {
  return CHAT_THREADS.find(thread => thread.id === chatId)
}

export function resolveChatActivePage(
  pathname: string,
  basePath: string
): ChatActivePage {
  const trimmedBase = basePath.replace(/\/$/, '')
  const raw = pathname.startsWith(trimmedBase)
    ? pathname.slice(trimmedBase.length)
    : pathname
  const relative = raw || '/'
  const firstSegment = relative.replace(/^\//, '').split('/')[0] ?? ''

  if (firstSegment === 'new') return { kind: 'new' }
  if (firstSegment === 'library') return { kind: 'library' }
  if (firstSegment === 'explore') return { kind: 'explore' }

  const threadId = firstSegment || DEFAULT_CHAT_THREAD_ID
  const thread = getChatThread(threadId) ?? CHAT_THREADS[0]

  if (!thread) return { kind: 'new' }

  return { kind: 'thread', thread }
}
