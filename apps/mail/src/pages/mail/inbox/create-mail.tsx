import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'

import { useCreateMailQuery } from '../../../utils/queryOptions'

export default function CreateMail() {
  const { isOpen, closeCompose } = useCreateMailQuery()

  const [minimized, setMinimized] = useState(false)
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  return (
    <div
      className={`fixed right-10 bottom-10 z-50 w-[500px] rounded-t-lg border bg-white shadow-2xl transition-all duration-200 ${
        minimized ? 'h-12' : ''
      }`}>
      <div className="bg-default-100 flex items-center justify-between rounded-t-lg border-b px-4 py-3">
        <span className="text-sm font-medium">New Message</span>

        <div className="text-default-600 flex gap-4">
          <Icon
            icon="mdi:minus"
            className="cursor-pointer"
            onClick={() => setMinimized(true)}
          />
          <Icon
            icon="mdi:arrow-expand"
            className="cursor-pointer"
            onClick={() => setMinimized(false)}
          />
          <Icon
            icon="mdi:close"
            className="cursor-pointer"
            onClick={closeCompose}
          />
        </div>
      </div>

      {!minimized && (
        <>
          <div className="space-y-2 px-4 py-3">
            <div className="flex items-center gap-2 border-b">
              <input
                placeholder="To"
                className="flex-1 py-2 text-sm outline-none"
              />
              <button
                className="text-xs text-blue-600"
                onClick={() => setShowCc(!showCc)}>
                Cc
              </button>
              <button
                className="text-xs text-blue-600"
                onClick={() => setShowBcc(!showBcc)}>
                Bcc
              </button>
            </div>

            {showCc && (
              <input
                placeholder="Cc"
                className="w-full border-b py-2 text-sm outline-none"
              />
            )}

            {showBcc && (
              <input
                placeholder="Bcc"
                className="w-full border-b py-2 text-sm outline-none"
              />
            )}

            <input
              placeholder="Subject"
              className="w-full border-b py-2 text-sm outline-none"
            />

            <textarea className="h-56 w-full resize-none text-sm outline-none" />
          </div>

          <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="flex items-center gap-4">
              <button className="bg-primary rounded-full px-6 py-2 text-sm text-white">
                Send
              </button>

              <Icon icon="mdi:format-size" className="cursor-pointer" />

              <Icon
                icon="mdi:paperclip"
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              />

              <Icon icon="mdi:link-variant" className="cursor-pointer" />
              <Icon icon="mdi:emoticon-outline" className="cursor-pointer" />
              <Icon icon="mdi:google-drive" className="cursor-pointer" />
              <Icon icon="mdi:image-outline" className="cursor-pointer" />
              <Icon icon="mdi:lock-clock" className="cursor-pointer" />
              <Icon icon="mdi:pencil-outline" className="cursor-pointer" />
              <Icon icon="mdi:dots-vertical" className="cursor-pointer" />
            </div>

            <Icon
              icon="mdi:trash-can-outline"
              className="text-default-600 cursor-pointer"
              onClick={closeCompose}
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={e => {
              console.log('Selected file:', e.target.files?.[0])
            }}
          />
        </>
      )}
    </div>
  )
}
