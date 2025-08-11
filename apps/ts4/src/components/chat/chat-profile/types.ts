import type { HTMLAttributes } from 'react'

export interface MessagingChatProfileProps
  extends HTMLAttributes<HTMLDivElement> {
  paginate?: (direction: number) => void
}

export type MessagingInteractionProps = {
  key: string
  title: string
  time: string
  message: string
}

export type DummyImageProps = {
  name: string
  src: string
}
