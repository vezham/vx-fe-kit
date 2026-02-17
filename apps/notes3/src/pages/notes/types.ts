export type Note = {
  id: number
  title: string
  content: string
  isPinned: boolean
  isArchived: boolean
  isDeleted: boolean
  createdAt: number
}
export type Props = {
  note: Note
  onView?: () => void
  onEdit?: () => void
  onPin?: () => void
  onArchive?: () => void
  onUnarchive?: () => void
  onDelete?: () => void
  onRestore?: () => void
  onPermanentDelete?: () => void
}
