'use client'

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  ScrollShadow,
  Tooltip
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

import { cn } from '@heroui/react'
import messagingChatConversations from '../data/messaging-chat-conversations'
import type {
  MessagingChatInputProps,
  MessagingChatMessageProps,
  MessagingChatWindowProps
} from './types'
import { inputClassNames, messageBubbleClass } from './variant'

// ---- Chat Message ----
const MessagingChatMessage = React.forwardRef<
  HTMLDivElement,
  MessagingChatMessageProps
>(
  (
    {
      avatar,
      name,
      time,
      message,
      isRTL,
      imageUrl,
      className,
      classNames,
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn('flex gap-3', { 'flex-row-reverse': isRTL }, className)}>
        <div className="relative flex-none">
          <Avatar src={avatar} />
        </div>
        <div className="flex max-w-[70%] flex-col gap-4">
          <div
            className={cn(
              'rounded-medium bg-content2 text-default-600 relative w-full px-4 py-3',
              messageBubbleClass,
              classNames?.base
            )}>
            <div className="flex justify-between">
              <div className="text-small text-default-foreground font-semibold">
                {name}
              </div>
              <div className="text-small text-default-400">{time}</div>
            </div>
            <div className="text-small text-default-900 mt-2 whitespace-pre-line">
              {message}
              {imageUrl && (
                <Image
                  alt={`Image from ${name}`}
                  className="border-default-200 shadow-small mt-2 border-2"
                  src={imageUrl}
                  width={264}
                  height={96}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
MessagingChatMessage.displayName = 'MessagingChatMessage'

// ---- Chat Input ----
const MessagingChatInput = React.forwardRef<
  HTMLInputElement,
  MessagingChatInputProps
>((props, ref) => {
  const [message, setMessage] = React.useState('')

  return (
    <Input
      ref={ref}
      aria-label="message"
      classNames={inputClassNames}
      endContent={
        <div className="flex items-center gap-2">
          {!message && (
            <Tooltip content="Speak">
              <Button isIconOnly radius="full" variant="light">
                <Icon
                  icon="solar:microphone-3-linear"
                  width={20}
                  className="text-default-500"
                />
              </Button>
            </Tooltip>
          )}
          <Tooltip content="Send message">
            <Button
              isIconOnly
              radius="lg"
              className="bg-foreground h-[30px] w-[30px] min-w-[30px] leading-[30px]">
              <Icon
                icon="solar:arrow-up-linear"
                width={20}
                className="text-default-50 cursor-pointer [&>path]:stroke-[2px]"
              />
            </Button>
          </Tooltip>
        </div>
      }
      placeholder=""
      radius="lg"
      startContent={
        <Tooltip content="Add file">
          <Button isIconOnly radius="full" variant="light">
            <Icon
              icon="solar:paperclip-linear"
              width={20}
              className="text-default-500"
            />
          </Button>
        </Tooltip>
      }
      value={message}
      variant="bordered"
      onValueChange={setMessage}
      {...props}
    />
  )
})
MessagingChatInput.displayName = 'MessagingChatInput'

// ---- Main Chat Window ----
const MessagingChatWindow = React.forwardRef<
  HTMLDivElement,
  MessagingChatWindowProps
>(({ paginate, toggleMessagingProfileSidebar, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <div className="sm:border-default-200 lg:border-l-small xl:border-r-small w-full flex-col">
        <div className="border-y-small border-default-200 flex h-17 items-center gap-2 p-3 sm:p-4 lg:border-t-0">
          <div className="w-full">
            <div className="text-small font-semibold">
              Application for launch promotion
            </div>
            <div className="text-small text-default-500 mt-1">Via Web</div>
          </div>
          <div className="flex-end flex cursor-pointer">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="text-default-500 min-w-6"
                  variant="light">
                  <Icon icon="solar:menu-dots-bold" width={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key: React.Key) => {
                  if (key === 'view_profile') {
                    // u/krishnaTODO: needtohandle that error
                    // eslint-disable-next-line
                    toggleMessagingProfileSidebar?.() ?? paginate?.(1)
                  }
                }}>
                <DropdownItem key="view_profile" className="xl:hidden">
                  View Profile
                </DropdownItem>
                <DropdownItem key="mark_as_spam">Mark as spam</DropdownItem>
                <DropdownItem key="delete" className="text-danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex w-full overflow-visible">
          <ScrollShadow className="flex max-h-[calc(100vh-220px)] flex-col gap-6 px-6 py-4 lg:max-h-[calc(100vh-162px)]">
            {messagingChatConversations.map(
              (messagingChatConversations, idx) => (
                <MessagingChatMessage
                  key={idx}
                  {...messagingChatConversations}
                />
              )
            )}
          </ScrollShadow>
        </div>
        <div className="mx-2 mt-auto flex flex-col">
          <MessagingChatInput />
        </div>
      </div>
    </div>
  )
})
MessagingChatWindow.displayName = 'MessagingChatWindow'

export default MessagingChatWindow
