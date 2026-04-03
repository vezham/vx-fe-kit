// import { Icon } from '@iconify/react'
// import { memo } from 'react'
// import { Button, Chip,  Input } from '@vezham/react/v3'
// import { Contact } from '../../store/useContacts/contact'
// import { ContactDetail } from './details'
// import { ContactForm } from './add'
// import { Drawer } from '@vezham/react/v2'
// interface MobileLayoutProps {
//     showMobileContacts: boolean
//     setShowMobileContacts: (show: boolean) => void
//     sidebarOpen: boolean
//     setSidebarOpen: (open: boolean) => void
//     search: string
//     setSearch: (search: string) => void
//     store: any
//     filtered: Contact[]
//     isEditing: boolean
//     editFormData: Partial<Contact>
//     updateFormField: (field: keyof Contact, value: any) => void
//     handleCancel: () => void
//     handleSave: () => void
//     handleEdit: () => void
//     handleDelete: () => void
//     handleBackToContacts: () => void
//     handleAdd: () => void
//     getGroupCount: (group: 'iCloud' | 'onMyMac' | 'other') => number
//     SidebarContent: React.ComponentType
//     ContactList: React.ComponentType<{ className?: string }>
//     isMobile: boolean
// }
// export const MobileLayout = memo(({
//     showMobileContacts,
//     setShowMobileContacts,
//     sidebarOpen,
//     setSidebarOpen,
//     search,
//     setSearch,
//     store,
//     filtered,
//     isEditing,
//     editFormData,
//     updateFormField,
//     handleCancel,
//     handleSave,
//     handleEdit,
//     handleDelete,
//     handleBackToContacts,
//     handleAdd,
//     getGroupCount,
//     SidebarContent,
//     ContactList,
//     isMobile
// }: MobileLayoutProps) => {
//     return (
//         <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
//             <div className="border-b bg-white p-4">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                         {!showMobileContacts && !isEditing && (
//                             <Button
//                                 isIconOnly
//                                 variant="tertiary"
//                                 onClick={handleBackToContacts}>
//                                 <Icon icon="lucide:arrow-left" className="text-xl" />
//                             </Button>
//                         )}
//                         {isEditing && (
//                             <Button isIconOnly variant="tertiary" onClick={handleCancel}>
//                                 <Icon icon="lucide:arrow-left" className="text-xl" />
//                             </Button>
//                         )}
//                         <h1 className="text-xl font-semibold">
//                             {isEditing
//                                 ? store.selectedId
//                                     ? 'Edit Contact'
//                                     : 'New Contact'
//                                 : showMobileContacts
//                                     ? 'All Contacts'
//                                     : store.selected?.name || 'Contact'}
//                         </h1>
//                     </div>
//                     <div className="flex gap-1">
//                         {showMobileContacts && !isEditing && (
//                             <>
//                                 <Button
//                                     isIconOnly
//                                     variant="tertiary"
//                                     onClick={handleAdd}
//                                     className="text-primary">
//                                     <Icon icon="lucide:plus" className="text-xl" />
//                                 </Button>
//                                 <Button
//                                     isIconOnly
//                                     variant="tertiary"
//                                     onClick={() => setSidebarOpen(true)}>
//                                     <Icon icon="lucide:menu" className="text-xl" />
//                                 </Button>
//                             </>
//                         )}
//                         {!showMobileContacts && !isEditing && store.selected && (
//                             <Button
//                                 variant="tertiary"
//                                 onClick={handleEdit}
//                                 className="font-medium">
//                                 Edit
//                             </Button>
//                         )}
//                     </div>
//                 </div>
//                 {showMobileContacts && !isEditing && (
//                     <div className="mt-3">
//                         <Input
//                             placeholder="Search All iCloud..."
//                             value={search}
//                             onChange={e => setSearch(e.target.value)}
//                             startContent={
//                                 <Icon icon="lucide:search" className="text-default-400" />
//                             }
//                             className="w-full"
//                         />
//                     </div>
//                 )}
//             </div>
//             <div className="flex-1 overflow-hidden">
//                 {isEditing ? (
//                     <ContactForm
//                         editFormData={editFormData}
//                         updateFormField={updateFormField}
//                         handleCancel={handleCancel}
//                         handleSave={handleSave}
//                         isMobile={isMobile}
//                     />
//                 ) : showMobileContacts ? (
//                     <div className="h-full overflow-y-auto">
//                         <div className="sticky top-0 z-10 flex gap-2 overflow-x-auto border-b bg-white p-3">
//                             {[
//                                 { id: 'all', label: 'All Contacts' },
//                                 { id: 'iCloud', label: 'iCloud' },
//                                 { id: 'onMyMac', label: 'On My Mac' },
//                                 { id: 'other', label: 'Other Known' }
//                             ].map(group => (
//                                 <Chip
//                                     key={group.id}
//                                     variant={store.activeGroup === group.id ? 'solid' : 'flat'}
//                                     color={store.activeGroup === group.id ? 'primary' : 'default'}
//                                     className="cursor-pointer"
//                                     onClick={() => store.setActiveGroup(group.id as any)}>
//                                     {group.label}
//                                     {group.id !== 'all' && (
//                                         <span className="ml-1 text-xs opacity-70">
//                                             ({getGroupCount(group.id as any)})
//                                         </span>
//                                     )}
//                                 </Chip>
//                             ))}
//                         </div>
//                         <ContactList className="h-full overflow-y-auto pb-20" />
//                     </div>
//                 ) : (
//                     <ContactDetail
//                         selected={store.selected}
//                         isMobile={isMobile}
//                         handleBackToContacts={handleBackToContacts}
//                         handleDelete={handleDelete}
//                         handleEdit={handleEdit}
//                     />
//                 )}
//             </div>
//             <Drawer
//                 open={sidebarOpen}
//                 onOpenChange={setSidebarOpen}
//                 side="left"
//                 size="sm">
//                 <div className="h-full p-4">
//                     <div className="mb-4 flex items-center justify-between border-b pb-2">
//                         <h2 className="text-lg font-semibold">Groups</h2>
//                         <Button
//                             isIconOnly
//                             variant="tertiary"
//                             onClick={() => setSidebarOpen(false)}>
//                             <Icon icon="lucide:x" className="text-xl" />
//                         </Button>
//                     </div>
//                     <SidebarContent />
//                 </div>
//             </Drawer>
//         </div>
//     )
// })
// MobileLayout.displayName = 'MobileLayout'
import { Icon } from '@iconify/react'
import { memo } from 'react'

import { Drawer } from '@vezham/react/v2'
import { Button, Chip, Input } from '@vezham/react/v3'

import { ContactForm } from './add'
import { ContactDetail } from './details'
import { GroupItem, MobileLayoutProps } from './types'
import { chipTva, iconTva, mobileLayoutTva } from './variant'

export const MobileLayout = memo(
  ({
    showMobileContacts,
    setShowMobileContacts,
    sidebarOpen,
    setSidebarOpen,
    search,
    setSearch,
    store,
    filtered,
    isEditing,
    editFormData,
    updateFormField,
    handleCancel,
    handleSave,
    handleEdit,
    handleDelete,
    handleBackToContacts,
    handleAdd,
    getGroupCount,
    SidebarContent,
    ContactList,
    isMobile
  }: MobileLayoutProps) => {
    const styles = mobileLayoutTva()
    const iconStyles = iconTva
    const chipStyles = chipTva

    const groups: GroupItem[] = [
      { id: 'all', label: 'All Contacts' },
      { id: 'iCloud', label: 'iCloud' },
      { id: 'onMyMac', label: 'On My Mac' },
      { id: 'other', label: 'Other Known' }
    ]

    return (
      <div className={styles.container()}>
        <div className={styles.header()}>
          <div className={styles.headerTop()}>
            <div className={styles.headerLeft()}>
              {!showMobileContacts && !isEditing && (
                <Button
                  isIconOnly
                  variant="tertiary"
                  onClick={handleBackToContacts}>
                  <Icon
                    icon="lucide:arrow-left"
                    className={iconStyles({ size: 'md' })}
                  />
                </Button>
              )}
              {isEditing && (
                <Button isIconOnly variant="tertiary" onClick={handleCancel}>
                  <Icon
                    icon="lucide:arrow-left"
                    className={iconStyles({ size: 'md' })}
                  />
                </Button>
              )}
              <h1 className={styles.headerTitle()}>
                {isEditing
                  ? store.selectedId
                    ? 'Edit Contact'
                    : 'New Contact'
                  : showMobileContacts
                    ? 'All Contacts'
                    : store.selected?.name || 'Contact'}
              </h1>
            </div>
            <div className={styles.headerActions()}>
              {showMobileContacts && !isEditing && (
                <>
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={handleAdd}
                    className="text-primary">
                    <Icon
                      icon="lucide:plus"
                      className={iconStyles({ size: 'md' })}
                    />
                  </Button>
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={() => setSidebarOpen(true)}>
                    <Icon
                      icon="lucide:menu"
                      className={iconStyles({ size: 'md' })}
                    />
                  </Button>
                </>
              )}
              {!showMobileContacts && !isEditing && store.selected && (
                <Button
                  variant="tertiary"
                  onClick={handleEdit}
                  className="font-medium">
                  Edit
                </Button>
              )}
            </div>
          </div>

          {showMobileContacts && !isEditing && (
            <div className={styles.searchWrapper()}>
              <Input
                placeholder="Search All iCloud..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                startContent={
                  <Icon
                    icon="lucide:search"
                    className={iconStyles({ color: 'default' })}
                  />
                }
                className="w-full"
              />
            </div>
          )}
        </div>

        <div className={styles.contentArea()}>
          {isEditing ? (
            <ContactForm
              editFormData={editFormData}
              updateFormField={updateFormField}
              handleCancel={handleCancel}
              handleSave={handleSave}
              isMobile={isMobile}
            />
          ) : showMobileContacts ? (
            <div className="h-full overflow-y-auto">
              <div className={styles.chipContainer()}>
                {groups.map(group => (
                  <Chip
                    key={group.id}
                    variant={store.activeGroup === group.id ? 'solid' : 'flat'}
                    color={
                      store.activeGroup === group.id ? 'primary' : 'default'
                    }
                    className={chipStyles()}
                    onClick={() => store.setActiveGroup(group.id as any)}>
                    {group.label}
                    {group.id !== 'all' && (
                      <span className="ml-1 text-xs opacity-70">
                        ({getGroupCount(group.id as any)})
                      </span>
                    )}
                  </Chip>
                ))}
              </div>
              <ContactList className={styles.contactListContainer()} />
            </div>
          ) : (
            <ContactDetail
              selected={store.selected}
              isMobile={isMobile}
              handleBackToContacts={handleBackToContacts}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </div>

        <Drawer
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          side="left"
          size="sm">
          <div className={styles.drawerContainer()}>
            <div className={styles.drawerHeader()}>
              <h2 className={styles.drawerTitle()}>Groups</h2>
              <Button
                isIconOnly
                variant="tertiary"
                onClick={() => setSidebarOpen(false)}>
                <Icon icon="lucide:x" className={iconStyles({ size: 'md' })} />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </Drawer>
      </div>
    )
  }
)

MobileLayout.displayName = 'MobileLayout'
