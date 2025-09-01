'use client'

import {
  Avatar,
  Badge,
  cn,
  Input,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Tab,
  Tabs
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

import type { MessageChatInboxProps, MessagingChatListItem } from './types'
import * as variants from './variant'

const MessageChatInbox = React.forwardRef<
  HTMLDivElement,
  MessageChatInboxProps
>(({ paginate, chatList, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <div className="w-full overflow-visible pb-10">
        <div className="mt-3 flex flex-col gap-4 px-3 sm:px-6">
          <Input
            aria-label="Search"
            labelPlacement="outside"
            placeholder="Search..."
            radius="md"
            startContent={
              <Icon
                className="text-default-500 [&>g]:stroke-[2px]"
                icon="solar:magnifer-linear"
                width={18}
              />
            }
            variant="bordered"
          />

          <Tabs
            fullWidth
            classNames={{
              cursor: 'group-data-[selected=true]:bg-content1'
            }}>
            <Tab key="inbox" title="Inbox" />
            <Tab key="unread" title="Unread" />
          </Tabs>
        </div>

        <ScrollShadow className="flex max-h-[calc(100vh-196px)] flex-col gap-6 overflow-y-auto px-3">
          <Listbox
            classNames={{
              base: 'p-0'
            }}
            items={chatList}
            variant="flat">
            {(item: MessagingChatListItem) => (
              <ListboxItem
                key={item.id}
                className={cn(variants.listboxItemClass(item.active))}
                endContent={
                  <div className="text-small text-default-400">{item.time}</div>
                }
                textValue={item.name}
                onPress={() => paginate?.(1)}>
                <div className={variants.avatarBadgeWrapper}>
                  {item.count === 0 ? (
                    <Avatar
                      alt={item.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.avatar}
                    />
                  ) : (
                    <Badge color="danger" content={item.count}>
                      <Avatar
                        alt={item.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={item.avatar}
                      />
                    </Badge>
                  )}
                  <div className="ml-2 min-w-0 flex-1">
                    <div className={variants.nameTextClass}>{item.name}</div>
                    <div className={variants.messageTextClass}>
                      {item.message}
                    </div>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </ScrollShadow>
      </div>
    </div>
  )
})

MessageChatInbox.displayName = 'MessageChatInbox'

export default MessageChatInbox
