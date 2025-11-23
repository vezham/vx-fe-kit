'use client'

import { Icon } from '@iconify/react'
import React from 'react'

import { Button, Chip, cn } from '@vezham/react/v2'

import type { MessagingChatHeaderProps } from './types'
import * as styles from './variant'

const MessagingChatHeader = React.forwardRef<
  HTMLInputElement,
  MessagingChatHeaderProps
>(({ page, paginate, onOpen, className, ...props }, ref) => {
  return (
    <div className={cn(styles.headerBaseClass, className)} {...props} ref={ref}>
      {page === 0 ? (
        <Button
          isIconOnly
          className={styles.menuButtonClass(page)}
          size="sm"
          variant="light"
          onPress={onOpen}>
          <Icon height={24} icon="solar:hamburger-menu-outline" width={24} />
        </Button>
      ) : (
        <Button
          isIconOnly
          className={styles.backButtonClass}
          size="sm"
          variant="light"
          onPress={() => paginate?.(-1)}>
          <Icon height={24} icon="solar:arrow-left-outline" width={24} />
        </Button>
      )}

      <div className={styles.titleWrapperClass(page)}>
        <h2 className="text-large font-bold dark:text-white">Chats</h2>
        <Chip classNames={styles.chipClassNames} size="sm" variant="flat">
          24
        </Chip>
      </div>

      <Button
        isIconOnly
        className={styles.composeButtonClass}
        variant="bordered">
        <Icon
          className={styles.composeIconClass}
          icon="solar:pen-new-square-linear"
          width={15}
        />
      </Button>
    </div>
  )
})

MessagingChatHeader.displayName = 'MessagingChatHeader'

export default MessagingChatHeader
