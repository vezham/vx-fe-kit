import type { SlotsToClasses } from '@vezham/react-utils'
import { PropGetter } from '@vezham/react-utils'

import { BottomContentTvaSlots, bottomContentTva } from './variant'

export interface BottomContentProps {
  page: number
  pages: number
  onPaginationChange: (newPage: number) => Promise<void>
  onPreviousPage: () => Promise<void>
  onNextPage: () => Promise<void>
  classNames?: SlotsToClasses<BottomContentTvaSlots>
}

export const useBottomContentProps = (originalProps: BottomContentProps) => {
  const isFirstPage = originalProps.page === 1
  const isLastPage = originalProps.page === originalProps.pages

  const slots = bottomContentTva({ isFirstPage, isLastPage } as any)

  const getPaginationContainerProps: PropGetter = () => ({
    className: slots.paginationContainer({
      class: originalProps.classNames?.paginationContainer
    })
  })

  const getPaginationButtonContainerProps: PropGetter = () => ({
    className: slots.paginationButtonContainer({
      class: originalProps.classNames?.paginationButtonContainer
    })
  })

  const getPaginationButtonProps: PropGetter = () => ({
    className: slots.paginationButton({
      class: originalProps.classNames?.paginationButton
    })
  })

  const getPaginationIconProps: PropGetter = () => ({
    className: slots.paginationIcon({
      class: originalProps.classNames?.paginationIcon
    })
  })

  const getPaginationMobileIconProps: PropGetter = () => ({
    className: slots.paginationMobileIcon({
      class: originalProps.classNames?.paginationMobileIcon
    })
  })

  const getPaginationTextProps: PropGetter = () => ({
    className: slots.paginationText({
      class: originalProps.classNames?.paginationText
    })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    isFirstPage,
    isLastPage,
    getPaginationContainerProps,
    getPaginationButtonContainerProps,
    getPaginationButtonProps,
    getPaginationIconProps,
    getPaginationMobileIconProps,
    getPaginationTextProps
  } as const
}
