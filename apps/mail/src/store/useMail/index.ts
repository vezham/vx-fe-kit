import {
  type QueryClient,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { Mail } from './action'
import {
  getMailById,
  getMailSnapshot,
  getMailStats,
  getMailsByFolder
} from './data'
import type {
  Mail as MailThread,
  RQMailCreate,
  RQMailDelete,
  RQMailGet,
  RQMailList
} from './types'

export * from './types'

export const CK_MAIL = 'mail'

function cloneMail(mail: MailThread) {
  return {
    ...mail,
    labelIds: [...mail.labelIds],
    messages: mail.messages.map(message => ({
      ...message,
      attachments: message.attachments ? [...message.attachments] : undefined,
      body: [...message.body],
      cc: message.cc ? [...message.cc] : undefined,
      to: [...message.to]
    })),
    participants: [...mail.participants]
  }
}

function syncMailCaches(
  queryClient: QueryClient,
  mail: MailThread | undefined,
  mode: 'create' | 'delete'
) {
  const cachedMail = mail ? cloneMail(mail) : undefined
  const queries = queryClient.getQueryCache().findAll({ queryKey: [CK_MAIL] })

  for (const query of queries) {
    const queryKey = query.queryKey as readonly unknown[]
    const scope = queryKey[1]

    if (scope === 'get' || scope === 'getById') {
      const queryId = String(queryKey[2] ?? '')

      if (!mail || queryId !== mail.id) continue

      queryClient.setQueryData(
        queryKey,
        mode === 'delete' ? undefined : cloneMail(mail)
      )
      continue
    }

    if (scope !== undefined && scope !== 'list') continue

    const folderId = queryKey[2] ? String(queryKey[2]) : 'all'

    queryClient.setQueryData<MailThread[]>(queryKey, current => {
      const base = current ?? []
      const next = base.filter(item => item.id !== mail?.id)

      if (!mail || mode === 'delete') {
        return next
      }

      const shouldShow =
        folderId === 'all' ||
        (folderId === 'starred' ? mail.isStarred : mail.folderId === folderId)

      if (!shouldShow) {
        return next
      }

      return [cloneMail(mail), ...next]
    })
  }

  if (mail) {
    queryClient.setQueryData(
      [CK_MAIL, 'get', mail.id],
      mode === 'delete' ? undefined : cachedMail
    )
    queryClient.setQueryData(
      [CK_MAIL, 'getById', mail.id],
      mode === 'delete' ? undefined : cachedMail
    )
  }

  queryClient.setQueryData([CK_MAIL, 'stats'], getMailStats(getMailSnapshot()))
}

export const useMail = {
  create: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (rq: RQMailCreate) => Mail.create(rq),
      onSuccess: mail => {
        syncMailCaches(queryClient, mail, 'create')
        queryClient.invalidateQueries({
          queryKey: [CK_MAIL, 'list'],
          refetchType: 'none'
        })
      }
    })
  },

  delete: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (rq: RQMailDelete) => Mail.delete(rq),
      onSuccess: mail => {
        syncMailCaches(queryClient, mail, 'delete')
        queryClient.invalidateQueries({
          queryKey: [CK_MAIL, 'list'],
          refetchType: 'none'
        })
      }
    })
  },

  get: (rq: RQMailGet) =>
    useQuery({
      enabled: Boolean(rq.id),
      initialData: () => {
        const mail = getMailById(rq.id)
        return mail ? cloneMail(mail) : undefined
      },
      placeholderData: keepPreviousData,
      queryFn: () => Mail.get(rq),
      queryKey: [CK_MAIL, 'get', rq.id, rq],
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }),

  getById: (rq: RQMailGet) =>
    useQuery({
      enabled: Boolean(rq.id),
      initialData: () => {
        const mail = getMailById(rq.id)
        return mail ? cloneMail(mail) : undefined
      },
      placeholderData: keepPreviousData,
      queryFn: () => Mail.getById(rq),
      queryKey: [CK_MAIL, 'getById', rq.id, rq],
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }),

  stats: () =>
    useQuery({
      initialData: () => getMailStats(getMailSnapshot()),
      queryFn: async () => getMailStats(getMailSnapshot()),
      queryKey: [CK_MAIL, 'stats'],
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }),

  list: (rq: RQMailList = {}) =>
    useQuery({
      initialData: () => {
        const mails = getMailsByFolder(rq.folderId ?? 'all')
        return mails.map(cloneMail)
      },
      queryFn: () => Mail.list(rq),
      queryKey: [CK_MAIL, 'list', rq.folderId ?? 'all', rq],
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    })
}
