import type { InputProps } from '@heroui/react'
import type { HTMLAttributes } from 'react'

export interface MessagingChatWindowProps
  extends HTMLAttributes<HTMLDivElement> {
  paginate?: (page: number) => void
  toggleMessagingProfileSidebar?: () => void
}

export interface MessagingChatMessageProps
  extends HTMLAttributes<HTMLDivElement> {
  avatar: string
  name: string
  time: string
  message: string
  isRTL?: boolean
  imageUrl?: string
  className?: string
  classNames?: {
    base?: string
  }
}

// Corrected MessagingChatInputProps type
export type MessagingChatInputProps = Omit<InputProps, 'defaultValue'>
