import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

import { Avatar, ScrollShadow } from '@vezham/react/v2'

import { AppView } from '../../../components/app-view'
import { emails, listItemVariants } from './data'
import type { MailAppProps } from './types'

export function MailApp({ isOpen, onClose }: MailAppProps) {
  const [selectedEmail, setSelectedEmail] = React.useState<number | null>(null)

  const handleEmailClick = (id: number) => {
    setSelectedEmail(id)
  }

  const handleBack = () => {
    if (selectedEmail) {
      setSelectedEmail(null)
    } else {
      onClose()
    }
  }

  const selectedEmailData = emails.find(email => email.id === selectedEmail)

  return (
    <AppView
      isOpen={isOpen}
      onClose={handleBack}
      title={selectedEmail ? 'Email' : 'Mail'}>
      <ScrollShadow className="h-full">
        {!selectedEmail ? (
          <div className="py-2">
            {emails.map((email, index) => (
              <motion.div
                key={email.id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleEmailClick(email.id)}
                className={`mx-2 mb-2 cursor-pointer rounded-xl p-3 ${
                  email.unread ? 'bg-white/10' : 'hover:bg-white/5'
                }`}>
                <div className="flex items-start gap-3">
                  <Avatar
                    src={email.avatar}
                    size="sm"
                    className={email.unread ? 'ring-2 ring-blue-500' : ''}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm ${
                          email.unread
                            ? 'font-semibold text-white'
                            : 'text-gray-300'
                        }`}>
                        {email.sender}
                      </p>

                      <span className="text-xs whitespace-nowrap text-gray-400">
                        {email.time}
                      </span>
                    </div>

                    <p
                      className={`truncate text-sm ${
                        email.unread ? 'text-white' : 'text-gray-400'
                      }`}>
                      {email.subject}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {email.preview}
                    </p>

                    {email.hasAttachment && (
                      <div className="mt-1 flex items-center gap-1">
                        <Icon
                          icon="lucide:paperclip"
                          className="h-3 w-3 text-gray-400"
                        />
                        <span className="text-xs text-gray-400">
                          Attachment
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <Avatar src={selectedEmailData?.avatar} size="lg" />
              <div>
                <h3 className="font-semibold text-white">
                  {selectedEmailData?.sender}
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedEmailData?.time}
                </p>
              </div>
            </div>

            <h2 className="mb-3 text-lg text-white">
              {selectedEmailData?.subject}
            </h2>

            <p className="text-sm leading-relaxed text-gray-300">
              {selectedEmailData?.preview}
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              <br />
              Best regards,
              <br />
              {selectedEmailData?.sender}
            </p>

            {selectedEmailData?.hasAttachment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center gap-3 rounded-lg bg-white/10 p-3">
                <Icon
                  icon="lucide:file-text"
                  className="h-5 w-5 text-gray-300"
                />
                <div className="flex-1">
                  <p className="text-sm text-white">Document.pdf</p>
                  <p className="text-xs text-gray-400">2.4 MB</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </ScrollShadow>
    </AppView>
  )
}
