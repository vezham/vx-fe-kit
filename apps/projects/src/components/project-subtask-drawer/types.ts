import type { SlotsToClasses } from '@vezham/react-utils'
import { PropGetter } from '@vezham/react-utils'

import { DrawerTvaSlots, drawerTva } from './variant'

export interface SubTaskDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  taskId?: number
  classNames?: SlotsToClasses<DrawerTvaSlots>
}

export const useSubTaskDrawerProps = (originalProps: SubTaskDrawerProps) => {
  const slots = drawerTva({ isLoading: false })

  const getDrawerHeaderProps: PropGetter = () => ({
    className: slots.drawerHeader({
      class: originalProps.classNames?.drawerHeader
    })
  })

  const getCloseButtonProps: PropGetter = () => ({
    className: slots.closeButton({
      class: originalProps.classNames?.closeButton
    })
  })

  const getHeaderTitleProps: PropGetter = () => ({
    className: slots.headerTitle({
      class: originalProps.classNames?.headerTitle
    })
  })

  const getTaskChipProps: PropGetter = () => ({
    className: slots.taskChip({ class: originalProps.classNames?.taskChip })
  })

  const getDrawerBodyProps: PropGetter = () => ({
    className: slots.drawerBody({ class: originalProps.classNames?.drawerBody })
  })

  const getLoadingTextProps: PropGetter = () => ({
    className: slots.loadingText({
      class: originalProps.classNames?.loadingText
    })
  })

  const getGridContainerProps: PropGetter = () => ({
    className: slots.gridContainer({
      class: originalProps.classNames?.gridContainer
    })
  })

  const getTagsContainerProps: PropGetter = () => ({
    className: slots.tagsContainer({
      class: originalProps.classNames?.tagsContainer
    })
  })

  const getAttachmentsContainerProps: PropGetter = () => ({
    className: slots.attachmentsContainer({
      class: originalProps.classNames?.attachmentsContainer
    })
  })

  const getDrawerFooterProps: PropGetter = () => ({
    className: slots.drawerFooter({
      class: originalProps.classNames?.drawerFooter
    })
  })

  const getCancelButtonProps: PropGetter = () => ({
    className: slots.cancelButton({
      class: originalProps.classNames?.cancelButton
    })
  })

  const getSubmitButtonProps: PropGetter = () => ({
    className: slots.submitButton()
  })

  const getInputProps: PropGetter = () => ({
    className: slots.input({ class: originalProps.classNames?.input })
  })

  const getSelectProps: PropGetter = () => ({
    className: slots.select({ class: originalProps.classNames?.select })
  })

  const getChipProps: PropGetter = () => ({
    className: slots.chip({ class: originalProps.classNames?.chip })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    getDrawerHeaderProps,
    getCloseButtonProps,
    getHeaderTitleProps,
    getTaskChipProps,
    getDrawerBodyProps,
    getLoadingTextProps,
    getGridContainerProps,
    getTagsContainerProps,
    getAttachmentsContainerProps,
    getDrawerFooterProps,
    getCancelButtonProps,
    getSubmitButtonProps,
    getInputProps,
    getSelectProps,
    getChipProps
  } as const
}
