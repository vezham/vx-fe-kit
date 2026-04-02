// import { Icon } from '@iconify/react'
// import { memo } from 'react'
// import { Avatar, Button } from '@vezham/react/v3'
// import { Contact } from '../../store/useContacts/contact'
// interface ContactDetailProps {
//     selected: Contact | null
//     isMobile: boolean
//     handleBackToContacts: () => void
//     handleDelete: () => void
//     handleEdit: () => void
// }
// export const ContactDetail = memo(({
//     selected,
//     isMobile,
//     handleBackToContacts,
//     handleDelete,
//     handleEdit
// }: ContactDetailProps) => {
//     if (!selected) return null
//     const formatDate = (dateString?: string) => {
//         if (!dateString) return null
//         const date = new Date(dateString)
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         })
//     }
//     return (
//         <div className="flex h-full flex-1 flex-col overflow-auto bg-gradient-to-br from-[#d1d5db] via-[#c4b5fd] to-[#6d28d9]">
//             {isMobile && (
//                 <div className="sticky top-0 z-10 border-b bg-white p-4">
//                     <Button
//                         variant="ghost"
//                         startContent={<Icon icon="lucide:arrow-left" />}
//                         onClick={handleBackToContacts}>
//                         Back to Contacts
//                     </Button>
//                 </div>
//             )}
//             <div className="flex flex-1 items-start justify-center p-8">
//                 <div className="flex w-full max-w-[520px] flex-col gap-6">
//                     <div className="flex flex-col items-center gap-4">
//                         <Avatar className="h-48 w-48 bg-white/20 text-5xl font-semibold shadow-lg backdrop-blur-sm">
//                             {selected.name.charAt(0)}
//                         </Avatar>
//                         <h1 className="text-3xl font-semibold tracking-tight">
//                             {selected.name}
//                         </h1>
//                         {selected.company && (
//                             <p className="text-default-600">{selected.company}</p>
//                         )}
//                     </div>
//                     <div className="flex justify-center gap-3">
//                         <Button
//                             isIconOnly
//                             variant="tertiary"
//                             className="rounded-full bg-white/20 backdrop-blur-sm"
//                             aria-label="Message">
//                             <Icon icon="lucide:message-circle" className="text-default-700" />
//                         </Button>
//                         <Button
//                             isIconOnly
//                             variant="tertiary"
//                             className="rounded-full bg-white/20 backdrop-blur-sm"
//                             aria-label="Call">
//                             <Icon icon="lucide:phone" className="text-default-700" />
//                         </Button>
//                         <Button
//                             isIconOnly
//                             variant="tertiary"
//                             className="rounded-full bg-white/20 backdrop-blur-sm"
//                             aria-label="Video">
//                             <Icon icon="lucide:video" className="text-default-700" />
//                         </Button>
//                         <Button
//                             isIconOnly
//                             variant="tertiary"
//                             className="rounded-full bg-white/20 backdrop-blur-sm"
//                             aria-label="Mail">
//                             <Icon icon="lucide:mail" className="text-default-700" />
//                         </Button>
//                     </div>
//                     <div className="mt-2 flex flex-col gap-3">
//                         {selected.group && (
//                             <div className="rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">Group</span>
//                                 <div className="mt-1 flex items-center gap-2">
//                                     <Icon
//                                         icon={
//                                             selected.group === 'iCloud'
//                                                 ? 'lucide:cloud'
//                                                 : selected.group === 'onMyMac'
//                                                     ? 'lucide:laptop'
//                                                     : 'lucide:users'
//                                         }
//                                         className="text-default-600"
//                                     />
//                                     <p className="font-medium">
//                                         {selected.group === 'iCloud'
//                                             ? 'iCloud'
//                                             : selected.group === 'onMyMac'
//                                                 ? 'On My Mac'
//                                                 : 'Other Known'}
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                         {selected.mobile && (
//                             <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">Mobile</span>
//                                 <p className="mt-1 font-medium">{selected.mobile}</p>
//                             </div>
//                         )}
//                         {selected.home && (
//                             <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">Home</span>
//                                 <p className="mt-1 font-medium">{selected.home}</p>
//                             </div>
//                         )}
//                         {selected.email && (
//                             <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">Email</span>
//                                 <p className="mt-1 font-medium">{selected.email}</p>
//                             </div>
//                         )}
//                         {selected.birthday && (
//                             <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">Birthday</span>
//                                 <p className="mt-1 font-medium">
//                                     {formatDate(selected.birthday)}
//                                 </p>
//                             </div>
//                         )}
//                         {selected.username && (
//                             <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">
//                                     Username (Jabber)
//                                 </span>
//                                 <p className="mt-1">{selected.username}</p>
//                             </div>
//                         )}
//                         {selected.street && (
//                             <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                                 <span className="text-default-500 text-sm">Address</span>
//                                 <p className="mt-1">
//                                     {selected.street}
//                                     {selected.city && <>, {selected.city}</>}
//                                     {selected.state && <> {selected.state}</>}
//                                     {selected.zip && <> {selected.zip}</>}
//                                     {selected.country && (
//                                         <>
//                                             <br />
//                                             {selected.country}
//                                         </>
//                                     )}
//                                 </p>
//                             </div>
//                         )}
//                         <div className="min-h-[100px] cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                             <span className="text-default-500 text-sm">Notes</span>
//                             <p className="text-default-700 mt-1">
//                                 {selected.notes || (
//                                     <span className="text-default-400">
//                                         No additional notes
//                                     </span>
//                                 )}
//                             </p>
//                         </div>
//                         <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                             <span className="font-medium">Send Message</span>
//                             <Icon icon="lucide:chevron-right" className="text-default-400" />
//                         </div>
//                         <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
//                             <span className="font-medium">Share Contact</span>
//                             <Icon icon="lucide:chevron-right" className="text-default-400" />
//                         </div>
//                         <div className="hover:bg-danger/20 cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors">
//                             <span className="font-medium text-red-500">Block Contact</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// })
// ContactDetail.displayName = 'ContactDetail'
import { Icon } from '@iconify/react'
import { memo } from 'react'

import { Avatar, Button } from '@vezham/react/v3'

import { ContactDetailProps } from './types'
import { buttonTva, contactDetailTva, iconTva } from './variant'

export const ContactDetail = memo(
  ({
    selected,
    isMobile,
    handleBackToContacts,
    handleDelete,
    handleEdit
  }: ContactDetailProps) => {
    const styles = contactDetailTva()
    const iconStyles = iconTva()
    const buttonStyles = buttonTva()

    if (!selected) return null

    const formatDate = (dateString?: string) => {
      if (!dateString) return null
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getGroupIcon = (group: string) => {
      if (group === 'iCloud') return 'lucide:cloud'
      if (group === 'onMyMac') return 'lucide:laptop'
      return 'lucide:users'
    }

    const getGroupLabel = (group: string) => {
      if (group === 'iCloud') return 'iCloud'
      if (group === 'onMyMac') return 'On My Mac'
      return 'Other Known'
    }

    return (
      <div className={styles.container()}>
        {isMobile && (
          <div className={styles.mobileHeader()}>
            <Button
              variant="ghost"
              startContent={
                <Icon
                  icon="lucide:arrow-left"
                  className={iconStyles({ size: 'md' })}
                />
              }
              onClick={handleBackToContacts}>
              Back to Contacts
            </Button>
          </div>
        )}

        <div className={styles.contentWrapper()}>
          <div className={styles.detailWrapper()}>
            <div className={styles.avatarContainer()}>
              <Avatar className={styles.avatar()}>
                {selected.name.charAt(0)}
              </Avatar>
              <h1 className={styles.name()}>{selected.name}</h1>
              {selected.company && (
                <p className={styles.company()}>{selected.company}</p>
              )}
            </div>

            <div className={styles.actionButtons()}>
              <Button
                isIconOnly
                variant="tertiary"
                className={styles.actionButton()}
                aria-label="Message">
                <Icon
                  icon="lucide:message-circle"
                  className={iconStyles({ color: 'default' })}
                />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className={styles.actionButton()}
                aria-label="Call">
                <Icon
                  icon="lucide:phone"
                  className={iconStyles({ color: 'default' })}
                />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className={styles.actionButton()}
                aria-label="Video">
                <Icon
                  icon="lucide:video"
                  className={iconStyles({ color: 'default' })}
                />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className={styles.actionButton()}
                aria-label="Mail">
                <Icon
                  icon="lucide:mail"
                  className={iconStyles({ color: 'default' })}
                />
              </Button>
            </div>

            <div className={styles.infoContainer()}>
              {selected.group && (
                <div className={styles.infoCard()}>
                  <span className={styles.infoLabel()}>Group</span>
                  <div className={styles.infoValueWithIcon()}>
                    <Icon
                      icon={getGroupIcon(selected.group)}
                      className={iconStyles({ color: 'default' })}
                    />
                    <p className="font-medium">
                      {getGroupLabel(selected.group)}
                    </p>
                  </div>
                </div>
              )}

              {selected.mobile && (
                <div className={styles.infoCardCursor()}>
                  <span className={styles.infoLabel()}>Mobile</span>
                  <p className={styles.infoValue()}>{selected.mobile}</p>
                </div>
              )}

              {selected.home && (
                <div className={styles.infoCardCursor()}>
                  <span className={styles.infoLabel()}>Home</span>
                  <p className={styles.infoValue()}>{selected.home}</p>
                </div>
              )}

              {selected.email && (
                <div className={styles.infoCardCursor()}>
                  <span className={styles.infoLabel()}>Email</span>
                  <p className={styles.infoValue()}>{selected.email}</p>
                </div>
              )}

              {selected.birthday && (
                <div className={styles.infoCardCursor()}>
                  <span className={styles.infoLabel()}>Birthday</span>
                  <p className={styles.infoValue()}>
                    {formatDate(selected.birthday)}
                  </p>
                </div>
              )}

              {selected.username && (
                <div className={styles.infoCardCursor()}>
                  <span className={styles.infoLabel()}>Username (Jabber)</span>
                  <p className="mt-1">{selected.username}</p>
                </div>
              )}

              {selected.street && (
                <div className={styles.infoCardCursor()}>
                  <span className={styles.infoLabel()}>Address</span>
                  <p className="mt-1">
                    {selected.street}
                    {selected.city && <>, {selected.city}</>}
                    {selected.state && <> {selected.state}</>}
                    {selected.zip && <> {selected.zip}</>}
                    {selected.country && (
                      <>
                        <br />
                        {selected.country}
                      </>
                    )}
                  </p>
                </div>
              )}

              <div className={styles.notesCard()}>
                <span className={styles.infoLabel()}>Notes</span>
                <p className={styles.notesText()}>
                  {selected.notes || (
                    <span className={styles.noNotes()}>
                      No additional notes
                    </span>
                  )}
                </p>
              </div>

              <div className={styles.flexBetween()}>
                <span className="font-medium">Send Message</span>
                <Icon
                  icon="lucide:chevron-right"
                  className={iconStyles({ color: 'default' })}
                />
              </div>

              <div className={styles.flexBetween()}>
                <span className="font-medium">Share Contact</span>
                <Icon
                  icon="lucide:chevron-right"
                  className={iconStyles({ color: 'default' })}
                />
              </div>

              <div className={styles.infoCardDanger()}>
                <span className={styles.dangerText()}>Block Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ContactDetail.displayName = 'ContactDetail'
