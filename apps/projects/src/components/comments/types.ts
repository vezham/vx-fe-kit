import {
  PropGetter,
  ReactRef,
  cn,
  mapPropsVariants,
  useDOMRef
} from '@vezham/react-utils'
import { HTMLHeroUIProps } from '@vezham/react/v2'
import type { SlotsToClasses } from '@vezham/react/v2'

import { type tvProps, type tvSlots, tva } from './variant'

export interface Attachment {
  id: number
  name: string
  size: number
  type: string
  url: string
}

export interface Comment {
  id: number
  author: string
  content: string
  createdAt: Date
  attachments: Attachment[]
}

export interface CommentSectionProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  currentUser?: string
  comments?: Comment[]
  onAddComment?: (comment: Comment) => void
  onUpdateComment?: (id: number, content: string) => void
  onDeleteComment?: (id: number) => void
}

export interface CommentInputProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  currentUser?: string
  onAdd?: (comment: Comment) => void
}

export interface CommentListProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  comments?: Comment[]
  onEdit?: (id: number, content: string) => void
  onDelete?: (id: number) => void
}

const useCommentSectionProps = (originalProps: CommentSectionProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const { ref, className, classNames, ...otherProps } = props
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  const getSectionProps: PropGetter = () => ({
    ref: domRef,
    className: slots.section({
      class: cn(classNames?.section, className)
    }),
    ...otherProps
  })

  return {
    getSectionProps,
    currentUser: props.currentUser,
    comments: props.comments,
    onAddComment: props.onAddComment,
    onUpdateComment: props.onUpdateComment,
    onDeleteComment: props.onDeleteComment
  }
}

const useCommentInputProps = (originalProps: CommentInputProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const slots = tva(variantProps)

  return {
    currentUser: props.currentUser,
    onAdd: props.onAdd,
    getInputBoxProps: () => ({
      className: slots.inputBox({ class: props.classNames?.inputBox })
    }),
    getInputHeaderProps: () => ({
      className: slots.inputHeader({ class: props.classNames?.inputHeader })
    }),
    getAvatarProps: () => ({
      className: slots.avatar({ class: props.classNames?.avatar })
    }),
    getEditorProps: () => ({
      className: slots.editor({ class: props.classNames?.editor })
    }),
    getFooterProps: () => ({
      className: slots.footer({ class: props.classNames?.footer })
    }),
    getAttachmentPreviewProps: () => ({
      className: slots.attachmentPreview({
        class: props.classNames?.attachmentPreview
      })
    }),
    getAttachmentProps: () => ({
      className: slots.attachment({ class: props.classNames?.attachment })
    })
  }
}

const useCommentListProps = (originalProps: CommentListProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const slots = tva(variantProps)

  return {
    comments: props.comments,
    onEdit: props.onEdit,
    onDelete: props.onDelete,

    getCommentItemProps: () => ({
      className: slots.commentItem({ class: props.classNames?.commentItem })
    }),
    getCommentHeaderProps: () => ({
      className: slots.commentHeader({ class: props.classNames?.commentHeader })
    }),
    getCommentContentProps: () => ({
      className: slots.commentContent({
        class: props.classNames?.commentContent
      })
    }),
    getEditContainerProps: () => ({
      className: slots.editContainer({
        class: props.classNames?.editContainer
      })
    }),
    getEditActionsProps: () => ({
      className: slots.editActions({
        class: props.classNames?.editActions
      })
    }),
    getAttachmentsContainerProps: () => ({
      className: slots.attachmentsContainer({
        class: props.classNames?.attachmentsContainer
      })
    }),
    getAttachmentImageProps: () => ({
      className: slots.attachmentImage({
        class: props.classNames?.attachmentImage
      })
    }),
    getAttachmentLinkProps: () => ({
      className: slots.attachmentLink({
        class: props.classNames?.attachmentLink
      })
    }),
    getActionButtonsProps: () => ({
      className: slots.actionButtons({
        class: props.classNames?.actionButtons
      })
    }),
    getEditButtonProps: () => ({
      className: slots.editButton({ class: props.classNames?.editButton })
    }),
    getDeleteButtonProps: () => ({
      className: slots.deleteButton({
        class: props.classNames?.deleteButton
      })
    })
  }
}

export { useCommentSectionProps, useCommentListProps, useCommentInputProps }
