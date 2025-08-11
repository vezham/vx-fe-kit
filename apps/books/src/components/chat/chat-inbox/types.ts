export type MessagingChatListItem = {
  id: number
  avatar: string
  name: string
  message: string
  count: number
  time: string
  active?: boolean
}

export type MessageChatInboxProps = React.HTMLAttributes<HTMLDivElement> & {
  page?: number
  paginate?: (direction: number) => void
  chatList: MessagingChatListItem[]
}
