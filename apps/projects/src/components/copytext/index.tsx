import { Icon } from '@iconify/react'
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react'

import { Button, Tooltip } from '@vezham/react/v2'

import { CopyTextProps, useCopyTextProps } from './types'

export const CopyText = memo(
  forwardRef<HTMLDivElement, CopyTextProps>((props, forwardedRef) => {
    const {
      className,
      textClassName,
      children,
      copyText = 'Copy',
      timeout = 1500,
      variant = 'default',
      ...rest
    } = props

    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const handleCopy = async (e: React.MouseEvent) => {
      e.stopPropagation()
      try {
        await navigator.clipboard.writeText(String(children))
        setCopied(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setCopied(false)
        }, timeout)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    const {
      slots,
      getBaseProps,
      getTextProps,
      getButtonProps,
      getIconProps,
      getSuccessIconProps
    } = useCopyTextProps({ ...props, isCopied: copied })

    return (
      <div ref={forwardedRef} {...rest} {...getBaseProps()}>
        <span {...getTextProps()}>{children}</span>
        <Tooltip
          className="text-foreground"
          content={copied ? 'Copied!' : copyText}
          closeDelay={100}>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            {...getButtonProps()}
            onPress={handleCopy}>
            {copied ? (
              <Icon
                icon="solar:check-read-linear"
                {...getIconProps({ class: getSuccessIconProps().className })}
              />
            ) : (
              <Icon icon="solar:copy-linear" {...getIconProps()} />
            )}
          </Button>
        </Tooltip>
      </div>
    )
  })
)

CopyText.displayName = 'CopyText'
