import type { SlotsToClasses } from '@vezham/react-utils'
import { PropGetter } from '@vezham/react-utils'

import { DetailModalTvaSlots, detailModalTva } from './variant'

export interface TaskDetailModalProps {
  task?: any | null
  onOpenChange: () => void
  children?: React.ReactNode
  classNames?: SlotsToClasses<DetailModalTvaSlots>
}

export const useTaskDetailModalProps = (
  originalProps: TaskDetailModalProps
) => {
  const hasAttachments = (originalProps.task?.attachments?.length ?? 0) > 0

  const slots = detailModalTva({ hasAttachments, size: 'full' } as any)

  const getModalContentProps: PropGetter = () => ({
    className: slots.modalContent({
      class: originalProps.classNames?.modalContent
    })
  })

  const getModalHeaderProps: PropGetter = () => ({
    className: slots.modalHeader({
      class: originalProps.classNames?.modalHeader
    })
  })

  const getModalBodyProps: PropGetter = () => ({
    className: slots.modalBody({ class: originalProps.classNames?.modalBody })
  })

  const getModalFooterProps: PropGetter = () => ({
    className: slots.modalFooter({
      class: originalProps.classNames?.modalFooter
    })
  })

  const getTitleProps: PropGetter = () => ({
    className: slots.title({ class: originalProps.classNames?.title })
  })

  const getDescriptionProps: PropGetter = () => ({
    className: slots.description({
      class: originalProps.classNames?.description
    })
  })

  const getOwnerContainerProps: PropGetter = () => ({
    className: slots.ownerContainer({
      class: originalProps.classNames?.ownerContainer
    })
  })

  const getAttachmentsSectionProps: PropGetter = () => ({
    className: slots.attachmentsSection({
      class: originalProps.classNames?.attachmentsSection
    })
  })

  const getAttachmentsGridProps: PropGetter = () => ({
    className: slots.attachmentsGrid({
      class: originalProps.classNames?.attachmentsGrid
    })
  })

  const getAttachmentImageWrapperProps: PropGetter = () => ({
    className: slots.attachmentImageWrapper({
      class: originalProps.classNames?.attachmentImageWrapper
    })
  })

  const getAttachmentImageProps: PropGetter = () => ({
    className: slots.attachmentImage({
      class: originalProps.classNames?.attachmentImage
    })
  })

  const getAttachmentNameProps: PropGetter = () => ({
    className: slots.attachmentName({
      class: originalProps.classNames?.attachmentName
    })
  })

  const getPdfLinkProps: PropGetter = () => ({
    className: slots.pdfLink({ class: originalProps.classNames?.pdfLink })
  })

  const getDocLinkProps: PropGetter = () => ({
    className: slots.docLink({ class: originalProps.classNames?.docLink })
  })

  const getSheetLinkProps: PropGetter = () => ({
    className: slots.sheetLink({ class: originalProps.classNames?.sheetLink })
  })

  const getDefaultLinkProps: PropGetter = () => ({
    className: slots.defaultLink({
      class: originalProps.classNames?.defaultLink
    })
  })

  const getIconProps: PropGetter = () => ({
    className: slots.icon({ class: originalProps.classNames?.icon })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    hasAttachments,
    getModalContentProps,
    getModalHeaderProps,
    getModalBodyProps,
    getModalFooterProps,
    getTitleProps,
    getDescriptionProps,
    getOwnerContainerProps,
    getAttachmentsSectionProps,
    getAttachmentsGridProps,
    getAttachmentImageWrapperProps,
    getAttachmentImageProps,
    getAttachmentNameProps,
    getPdfLinkProps,
    getDocLinkProps,
    getSheetLinkProps,
    getDefaultLinkProps,
    getIconProps
  } as const
}
