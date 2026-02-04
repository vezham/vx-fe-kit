import { PropGetter } from '@vezham/react-utils'
import { SlotsToClasses } from '@vezham/react/v2'

import { CopyTextTvaSlots, copyTextTva } from './variant'

export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  textClassName?: string
  copyText?: string
  timeout?: number
  children: string
  variant?: 'default' | 'compact'
  classNames?: SlotsToClasses<CopyTextTvaSlots>
}

export const useCopyTextProps = (
  originalProps: CopyTextProps & { isCopied: boolean }
) => {
  const slots = copyTextTva({
    variant: originalProps.variant || 'default',
    isCopied: originalProps.isCopied
  } as any)

  const getBaseProps: PropGetter = () => ({
    className: slots.base({ class: originalProps.className })
  })

  const getTextProps: PropGetter = () => ({
    className: slots.text({ class: originalProps.textClassName })
  })

  const getButtonProps: PropGetter = () => ({
    className: slots.button()
  })

  const getIconProps: PropGetter = () => ({
    className: slots.icon()
  })

  const getSuccessIconProps: PropGetter = () => ({
    className: slots.successIcon()
  })

  return {
    slots,
    getBaseProps,
    getTextProps,
    getButtonProps,
    getIconProps,
    getSuccessIconProps
  } as const
}
