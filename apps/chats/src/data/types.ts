import { ToolPartState } from '@heroui-pro/react'
import { ComponentType } from 'react'

export type ChatNavItemId = 'new' | 'library' | 'explore'

export type ChatNavItem = {
  id: ChatNavItemId
  icon: ComponentType<{ className?: string }>
  label: string
  href: string
  shortcut?: string
}

export type ChatModel = {
  id: string
  label: string
}

export type ChatSearchMode = {
  id: string
  label: string
}

export type ChatMessageToolGroup = {
  active?: boolean
  label: string
  tools: readonly ChatMessageTool[]
}

export type ChatMessageSource =
  | {
      description?: string
      sourceType: 'url'
      title?: string
      url: string
    }
  | {
      sourceType: 'document'
      title: string
    }

export type ChatMessageSourceGroup = {
  label: string
  sources: readonly ChatMessageSource[]
}

export type ChatMessageAttachment = {
  mimeType?: string
  name: string
  src?: string
}

export type ChatMessageImage = {
  alt: string
  src: string
}

export type ChatMessageReasoningStep = {
  content: string
  label: string
}

export type ChatMessageReasoning = {
  defaultExpanded?: boolean
  steps: readonly ChatMessageReasoningStep[]
  trigger: string
}

export type ChatMessageTool = {
  argsText?: string
  errorText?: string
  input?: unknown
  output?: unknown
  state: ToolPartState
  toolName: string
}

export type ChatAssistantStatus = 'complete' | 'skeleton' | 'streaming'

export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  actions?: 'full' | 'minimal'
  attachments?: readonly ChatMessageAttachment[]
  avatar?: {
    alt?: string
    fallback?: string
    src?: string
  }
  image?: ChatMessageImage
  /** Rich markdown body for assistant messages. */
  loaderLabel?: string
  markdown?: string
  listItems?: string[]
  reasoning?: ChatMessageReasoning
  showAvatar?: boolean
  sourceGroup?: ChatMessageSourceGroup
  sources?: readonly ChatMessageSource[]
  status?: ChatAssistantStatus
  text?: string
  toolGroup?: ChatMessageToolGroup
  tools?: readonly ChatMessageTool[]
}

export type ChatThread = {
  id: string
  title: string
  preview: string
  updatedAt: string
  modelId: string
  searchModeId: string
  user: {
    avatar: string
    email: string
    name: string
  }
  messages: readonly ChatMessage[]
}

export type ChatPageKind = 'thread' | 'new' | 'library' | 'explore'

export type ChatActivePage =
  | { kind: 'thread'; thread: ChatThread }
  | { kind: 'new' }
  | { kind: 'library' }
  | { kind: 'explore' }
