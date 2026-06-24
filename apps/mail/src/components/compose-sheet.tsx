'use client'

import { Paperclip, TrashBin } from '@gravity-ui/icons'
import { Sheet } from '@heroui-pro/react'
import { Button, Input, Label, TextArea, TextField } from '@heroui/react'
import { useState } from 'react'

import { useMail } from '../store/useMail'

export interface ComposeSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ComposeSheet({ isOpen, onOpenChange }: ComposeSheetProps) {
  const createMail = useMail.create()
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleCreate = (folderId: 'sent' | 'drafts') => {
    const normalizedTo = to.trim()
    const normalizedSubject = subject.trim()
    const normalizedBody = body.trim()

    if (!normalizedTo || !normalizedSubject || !normalizedBody) return

    createMail.mutate(
      {
        body: normalizedBody,
        folderId,
        subject: normalizedSubject,
        to: normalizedTo
      },
      {
        onSuccess: () => {
          setTo('')
          setSubject('')
          setBody('')
          onOpenChange(false)
        }
      }
    )
  }

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
              <form
                id="compose-mail-form"
                className="flex flex-col gap-4"
                onSubmit={event => {
                  event.preventDefault()
                  handleCreate('sent')
                }}>
                <TextField name="to" value={to} onChange={setTo} type="text">
                  <Label>To</Label>
                  <Input placeholder="name@example.com" variant="secondary" />
                </TextField>
                <TextField
                  name="subject"
                  value={subject}
                  onChange={setSubject}
                  type="text">
                  <Label>Subject</Label>
                  <Input placeholder="What's this about?" variant="secondary" />
                </TextField>
                <TextField name="body" value={body} onChange={setBody}>
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
                <Button
                  size="sm"
                  variant="tertiary"
                  onPress={() => handleCreate('drafts')}>
                  Save draft
                </Button>
                <Button form="compose-mail-form" size="sm" type="submit">
                  Send
                </Button>
              </div>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}
