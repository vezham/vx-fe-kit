import { CURRENT_USER } from '../useCurrentUser/data'
import {
  getMailById,
  getMailsByFolder,
  removeMailSnapshot,
  upsertMailSnapshot
} from './data'
import type {
  Mail as MailThread,
  RQMailCreate,
  RQMailDelete,
  RQMailGet,
  RQMailList
} from './types'

function buildMailAddress(input: string) {
  const trimmed = input.trim()
  const email = trimmed.includes('@')
    ? trimmed
    : `${trimmed.replace(/\s+/g, '.').toLowerCase()}@heroui.dev`
  const name = trimmed.includes('@')
    ? trimmed.split('@')[0].replace(/[._-]+/g, ' ')
    : trimmed

  return {
    avatar: undefined,
    email,
    name: name || email
  }
}

function splitParagraphs(body: string) {
  return body
    .split(/\n\s*\n/g)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
}

function createId(prefix: string) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Date.now()}`
}

const Mail = {
  list: async (rq: RQMailList): Promise<MailThread[]> => {
    return Promise.resolve(
      getMailsByFolder(rq.folderId).map(mail => ({
        ...mail,
        labelIds: [...mail.labelIds],
        messages: mail.messages.map(message => ({
          ...message,
          attachments: message.attachments
            ? [...message.attachments]
            : undefined,
          body: [...message.body],
          cc: message.cc ? [...message.cc] : undefined,
          to: [...message.to]
        })),
        participants: [...mail.participants]
      }))
    )
  },

  get: async (rq: RQMailGet): Promise<MailThread | undefined> => {
    const mail = getMailById(rq.id)

    if (!mail) return Promise.resolve(undefined)

    return Promise.resolve({
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
    })
  },

  getById: async (rq: RQMailGet): Promise<MailThread | undefined> => {
    const mail = getMailById(rq.id)

    if (!mail) return Promise.resolve(undefined)

    return Promise.resolve({
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
    })
  },

  create: async (rq: RQMailCreate): Promise<MailThread> => {
    const recipients = rq.to
      .split(/[;,]/g)
      .map(value => value.trim())
      .filter(Boolean)
      .map(buildMailAddress)

    const paragraphs = splitParagraphs(rq.body)
    const createdAt = 'Just now'
    const mail: MailThread = {
      folderId: rq.folderId ?? 'sent',
      id: createId('mail'),
      isImportant: false,
      isRead: true,
      isStarred: false,
      labelIds: [],
      messages: [
        {
          attachments: rq.attachments,
          body: paragraphs.length > 0 ? paragraphs : [rq.body.trim()],
          from: CURRENT_USER,
          id: createId('msg'),
          receivedAt: createdAt,
          to: recipients.length > 0 ? recipients : [buildMailAddress(rq.to)]
        }
      ],
      participants: [
        CURRENT_USER,
        ...(recipients.length > 0 ? recipients : [])
      ],
      preview: paragraphs[0] ?? rq.body.trim(),
      subject: rq.subject,
      updatedAt: createdAt
    }

    upsertMailSnapshot(mail)

    return Promise.resolve(mail)
  },

  delete: async (rq: RQMailDelete): Promise<MailThread | undefined> => {
    return Promise.resolve(removeMailSnapshot(rq.id))
  }
}

export { Mail }
