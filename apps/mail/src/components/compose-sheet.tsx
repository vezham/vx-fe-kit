'use client'

import { Paperclip, TrashBin } from '@gravity-ui/icons'
import { Sheet } from '@heroui-pro/react'
import { Button, Input, Label, TextArea, TextField } from '@heroui/react'

export interface ComposeSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ComposeSheet({ isOpen, onOpenChange }: ComposeSheetProps) {
  return (
    <Sheet isOpen={isOpen} placement="right" onOpenChange={onOpenChange}>
      <Sheet.Backdrop>
        <Sheet.Content className="w-full md:w-[520px]">
          <Sheet.Dialog>
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>New message</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <form className="flex flex-col gap-4">
                <TextField name="to" type="text">
                  <Label>To</Label>
                  <Input placeholder="name@example.com" variant="secondary" />
                </TextField>
                <TextField name="subject" type="text">
                  <Label>Subject</Label>
                  <Input placeholder="What's this about?" variant="secondary" />
                </TextField>
                <TextField name="body">
                  <Label>Message</Label>
                  <TextArea
                    className="min-h-[220px]"
                    placeholder="Write something thoughtful..."
                    variant="secondary"
                  />
                </TextField>
              </form>
            </Sheet.Body>
            <Sheet.Footer className="justify-between">
              <div className="flex items-center gap-1">
                <Button
                  isIconOnly
                  aria-label="Attach file"
                  size="sm"
                  variant="ghost">
                  <Paperclip className="size-4" />
                </Button>
                <Button
                  isIconOnly
                  aria-label="Discard draft"
                  size="sm"
                  variant="ghost">
                  <TrashBin className="size-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Sheet.Close>
                  <Button size="sm" variant="tertiary">
                    Save draft
                  </Button>
                </Sheet.Close>
                <Sheet.Close>
                  <Button size="sm">Send</Button>
                </Sheet.Close>
              </div>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}
