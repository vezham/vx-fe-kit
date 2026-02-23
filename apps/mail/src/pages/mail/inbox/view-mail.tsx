import { Icon } from '@iconify/react'

import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Tooltip
} from '@vezham/react/v2'

import { EmailDrawerProps } from './types'

export function ViewMailDrawer({
  isOpen,
  onOpenChange,
  email
}: EmailDrawerProps) {
  if (!email) return null

  return (
    <Drawer
      hideCloseButton
      backdrop="blur"
      classNames={{
        base: 'data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium'
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      size="lg">
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader className="border-default-200/50 bg-content1/50 absolute inset-x-0 top-0 z-50 flex flex-row justify-between gap-2 border-b px-2 py-2 backdrop-blur-lg backdrop-saturate-150">
              <Tooltip content="Close">
                <Button
                  isIconOnly
                  className="text-muted"
                  size="sm"
                  variant="light"
                  onPress={onClose}>
                  <Icon icon="lucide:arrow-right" width={20} />
                </Button>
              </Tooltip>
              <div className="flex w-full justify-start gap-2">
                <Button
                  className="text-small text-muted font-medium"
                  size="sm"
                  startContent={<Icon icon="lucide:copy" width={16} />}
                  variant="flat">
                  Copy Link
                </Button>
                <Button
                  className="text-small text-muted font-medium"
                  endContent={<Icon icon="lucide:external-link" width={16} />}
                  size="sm"
                  variant="flat">
                  Open
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Tooltip content="Archive">
                  <Button
                    isIconOnly
                    className="text-muted"
                    size="sm"
                    variant="flat">
                    <Icon icon="lucide:archive" width={16} />
                  </Button>
                </Tooltip>
                <Tooltip content="Delete">
                  <Button
                    isIconOnly
                    className="text-muted"
                    size="sm"
                    variant="flat">
                    <Icon icon="lucide:trash-2" width={16} />
                  </Button>
                </Tooltip>
              </div>
            </DrawerHeader>

            <DrawerBody className="pt-16">
              <div className="flex flex-col gap-2 py-4">
                <h1 className="text-2xl leading-7 font-bold">
                  {email.subject}
                </h1>

                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="border-default-200/50 rounded-small w-11 flex-none overflow-hidden border-1 text-center">
                      <div className="text-tiny bg-default-100 text-muted py-0.5">
                        {email.date
                          ? new Date(email.date).toLocaleString('en-US', {
                              month: 'short'
                            })
                          : ''}
                      </div>
                      <div className="text-medium text-muted flex h-6 items-center justify-center font-semibold">
                        {email.date ? new Date(email.date).getDate() : ''}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-medium text-foreground font-medium">
                        {email.date
                          ? new Date(email.date).toLocaleString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })
                          : ''}
                      </p>
                      <p className="text-small text-muted">
                        {email.formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <Avatar
                      src={`https://i.pravatar.cc/150?u=${email.sender.replace(/\s/g, '')}`}
                      name={email.sender}
                      size="md"
                    />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-medium text-foreground font-medium">
                        {email.sender}
                      </p>
                      <p className="text-small text-muted">
                        To: me{' '}
                        <Icon
                          icon="lucide:chevron-down"
                          className="inline"
                          width={14}
                        />
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      {email.labels &&
                        email.labels.map((label, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            color={label.color}
                            variant="flat">
                            {label.name}
                          </Chip>
                        ))}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-start gap-3">
                    <div className="text-medium text-muted flex flex-col gap-2">
                      <p>Hello,</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                        aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                        euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                        nunc, quis aliquam nisl nunc quis nisl.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                        aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                        euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                        nunc, quis aliquam nisl nunc quis nisl.
                      </p>
                      <p className="mt-4">
                        Regards,
                        <br />
                        {email.sender.split(' ')[0]}
                      </p>
                    </div>
                  </div>

                  {email.hasAttachment && (
                    <div className="mt-4 flex flex-col items-start gap-3">
                      <span className="text-medium font-medium">
                        Attachments
                      </span>
                      <div className="border-default-200 flex w-full items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-default-100 flex h-10 w-10 items-center justify-center rounded-md">
                            <Icon icon="lucide:file-text" width={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Document.pdf</p>
                            <p className="text-muted text-xs">2.4 MB</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button isIconOnly variant="light" size="sm">
                            <Icon icon="lucide:download" width={16} />
                          </Button>
                          <Button isIconOnly variant="light" size="sm">
                            <Icon icon="lucide:eye" width={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col items-start gap-3">
                    <span className="text-small text-muted">CC</span>
                    <div className="flex items-center gap-2">
                      <AvatarGroup
                        isBordered
                        classNames={{
                          base: 'pl-2',
                          count: 'text-muted text-tiny bg-default-100'
                        }}
                        size="sm"
                        total={3}>
                        <Avatar
                          className="data-[hover=true]:!translate-x-0"
                          name="Alex"
                          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                        />
                        <Avatar
                          className="data-[hover=true]:!translate-x-0"
                          name="Joe"
                          src="https://i.pravatar.cc/150?u=a04258114e290267084"
                        />
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerBody>

            <DrawerFooter className="flex items-center justify-between">
              <div className="flex gap-2">
                <Tooltip content="Reply">
                  <Button
                    variant="flat"
                    startContent={<Icon icon="lucide:reply" width={18} />}>
                    Reply
                  </Button>
                </Tooltip>
                <Tooltip content="Forward">
                  <Button
                    variant="flat"
                    startContent={<Icon icon="lucide:forward" width={18} />}>
                    Forward
                  </Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Mark as unread">
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:mail" width={18} />
                  </Button>
                </Tooltip>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
