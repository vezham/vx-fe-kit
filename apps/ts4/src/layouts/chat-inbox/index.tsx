import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'

import MessagingChatHeader from '../../components/chat/chat-header'
import MessageChatInbox from '../../components/chat/chat-inbox'
import MessagingChatProfile from '../../components/chat/chat-profile'
import MessagingChatWindow from '../../components/chat/chat-window'
import messagingChatList from '../../components/chat/data/messaging-chat-list'

type Props = {
  isSidebarOpen: boolean
}

const MessagingChatLayout: React.FC<Props> = ({ isSidebarOpen }) => {
  const [page, setPage] = useState(0) // 0: Inbox, 1: Window, 2: Profile
  const [showProfileOverlay, setShowProfileOverlay] = useState(false)
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  const isMobileOrTablet = width < 1024
  const isLG = width >= 1024 && width < 1280
  const isXL = width >= 1280

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goTo = (val: number) => setPage(val)
  const paginate = (val: number) => {
    setPage(prev => Math.min(Math.max(prev + val, 0), 2))
  }

  const openProfileOverlay = () => setShowProfileOverlay(true)
  const closeProfileOverlay = () => setShowProfileOverlay(false)

  return (
    <div className="relative min-h-screen w-full">
      {/* ----------- BELOW LG: Single Panel View ---------- */}
      {isMobileOrTablet && (
        <div className="grid h-full grid-cols-1 rounded-xl">
          {page === 0 && (
            <>
              <MessagingChatHeader page={page} paginate={paginate} />
              <MessageChatInbox
                page={page}
                paginate={() => goTo(1)}
                chatList={messagingChatList}
              />
            </>
          )}

          {page === 1 && (
            <>
              <MessagingChatHeader
                page={page}
                paginate={paginate}
                showBackButton={true}
                onBack={() => goTo(0)}
              />
              <MessagingChatWindow
                paginate={paginate}
                toggleMessagingProfileSidebar={() => goTo(2)}
              />
            </>
          )}

          {page === 2 && (
            <>
              <MessagingChatHeader
                page={page}
                paginate={paginate}
                showBackButton={true}
                onBack={() => goTo(1)}
              />
              <MessagingChatProfile paginate={paginate} />
            </>
          )}
        </div>
      )}

      {/* ----------- LG & ABOVE: Multi Panel View ---------- */}
      {!isMobileOrTablet && (
        <div className="border-default-200 grid w-full border lg:grid-cols-2 xl:grid-cols-3">
          {/* Inbox */}
          <div className="border-default-200 flex flex-col border-r">
            <MessagingChatHeader page={page} paginate={paginate} />
            <MessageChatInbox
              page={page}
              paginate={() => goTo(1)}
              chatList={messagingChatList}
            />
          </div>

          {/* Chat Window */}
          <div className="flex flex-col">
            <MessagingChatWindow
              paginate={paginate}
              toggleMessagingProfileSidebar={() => {
                if (isXL) {
                  goTo(2)
                } else {
                  openProfileOverlay()
                }
              }}
            />
          </div>

          {/* Profile Panel - visible only in XL */}
          {isXL && (
            <div className="border-default-200 flex flex-col border-l">
              <MessagingChatProfile paginate={paginate} />
            </div>
          )}
        </div>
      )}

      {/* Profile Overlay (for LG only, not XL) */}
      {isLG && showProfileOverlay && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="border-default-200 relative w-80 border-l bg-black shadow-lg">
            <button
              onClick={closeProfileOverlay}
              className="absolute top-2 left-2 z-10 rounded p-3"
              aria-label="Close profile overlay">
              <Icon icon="mdi:close" width="20" height="20" />
            </button>
            <MessagingChatProfile paginate={paginate} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagingChatLayout
