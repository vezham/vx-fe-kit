export interface MessagingChatHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  page?: number
  onOpen?: () => void
  paginate?: (direction: number) => void
}
