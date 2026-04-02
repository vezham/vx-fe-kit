// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { Avatar, Chip, Separator, useMediaQuery } from '@vezham/react/v3'
// import { Contact, useContactsStore } from '../../store/useContacts/contact'
// import { DesktopLayout } from './desktop'
// import { MobileLayout } from './mobile'
// export default function ContactsApp() {
//     const store = useContactsStore()
//     const [sidebarOpen, setSidebarOpen] = useState(true)
//     const [search, setSearch] = useState('')
//     const [showMobileContacts, setShowMobileContacts] = useState(true)
//     const [isEditing, setIsEditing] = useState(false)
//     const [editFormData, setEditFormData] = useState<Partial<Contact>>({})
//     const isMobile = useMediaQuery('(max-width: 768px)')
//     useEffect(() => {
//         if (isMobile && store.selectedId) {
//             setShowMobileContacts(false)
//         }
//     }, [isMobile, store.selectedId])
//     useEffect(() => {
//         if (isMobile && !store.selectedId) {
//             setShowMobileContacts(true)
//         }
//     }, [isMobile, store.selectedId])
//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             const target = e.target as HTMLElement
//             const isTyping =
//                 target.tagName === 'INPUT' ||
//                 target.tagName === 'TEXTAREA' ||
//                 target.isContentEditable
//             if (
//                 (e.key === 'Delete' || e.key === 'Del') &&
//                 !isEditing &&
//                 store.selectedId &&
//                 !isTyping
//             ) {
//                 e.preventDefault()
//                 if (
//                     window.confirm(
//                         `Are you sure you want to delete ${store.selected?.name}?`
//                     )
//                 ) {
//                     store.remove(store.selectedId)
//                     if (isMobile) {
//                         setShowMobileContacts(true)
//                     }
//                 }
//             }
//         }
//         window.addEventListener('keydown', handleKeyDown)
//         return () => window.removeEventListener('keydown', handleKeyDown)
//     }, [isEditing, store.selectedId, store.selected, store.remove, isMobile])
//     const handleBackToContacts = useCallback(() => {
//         setShowMobileContacts(true)
//         store.setSelectedId(null)
//         setIsEditing(false)
//     }, [store])
//     const filtered = useMemo(
//         () =>
//             store.filteredByGroup.filter(c =>
//                 c.name.toLowerCase().includes(search.toLowerCase())
//             ),
//         [store.filteredByGroup, search]
//     )
//     const handleAdd = useCallback(() => {
//         const defaultGroup =
//             store.activeGroup === 'all' ? 'iCloud' : store.activeGroup
//         setEditFormData({
//             firstName: '',
//             lastName: '',
//             company: '',
//             mobile: '',
//             home: '',
//             email: '',
//             birthday: '',
//             username: '',
//             street: '',
//             city: '',
//             state: '',
//             zip: '',
//             country: '',
//             notes: '',
//             group: defaultGroup as Contact['group']
//         })
//         setIsEditing(true)
//         store.setSelectedId(null)
//         if (isMobile) setShowMobileContacts(false)
//     }, [store.activeGroup, isMobile, store])
//     const handleEdit = useCallback(() => {
//         if (store.selected) {
//             setEditFormData({ ...store.selected })
//             setIsEditing(true)
//         }
//     }, [store.selected])
//     const handleCancel = useCallback(() => {
//         setIsEditing(false)
//         if (isMobile && !store.selectedId) {
//             setShowMobileContacts(true)
//         }
//     }, [store.selectedId, isMobile])
//     const handleSave = useCallback(() => {
//         if (!editFormData.firstName) {
//             alert('Please enter a first name')
//             return
//         }
//         const fullName = [editFormData.firstName, editFormData.lastName]
//             .filter(Boolean)
//             .join(' ')
//         if (store.selectedId) {
//             store.update(store.selectedId, {
//                 ...editFormData,
//                 name: fullName
//             })
//         } else {
//             store.add({
//                 ...editFormData,
//                 name: fullName,
//                 group: editFormData.group || 'iCloud'
//             } as Omit<Contact, 'id'>)
//         }
//         setIsEditing(false)
//     }, [editFormData, store.selectedId, store.update, store.add])
//     const handleDelete = useCallback(() => {
//         if (
//             store.selectedId &&
//             window.confirm(`Are you sure you want to delete ${store.selected?.name}?`)
//         ) {
//             store.remove(store.selectedId)
//             if (isMobile) {
//                 setShowMobileContacts(true)
//             }
//         }
//     }, [store.selectedId, store.selected, store.remove, isMobile])
//     const getGroupCount = useCallback(
//         (group: 'iCloud' | 'onMyMac' | 'other') => {
//             return store.contacts.filter(c => c.group === group).length
//         },
//         [store.contacts]
//     )
//     const updateFormField = useCallback((field: keyof Contact, value: any) => {
//         setEditFormData(prev => ({
//             ...prev,
//             [field]: value
//         }))
//     }, [])
//     const ContactList = useCallback(
//         ({ className = '' }: { className?: string }) => (
//             <div className={className}>
//                 <div className="flex-1 overflow-y-auto">
//                     {filtered.map(c => (
//                         <div
//                             key={c.id}
//                             onClick={() => {
//                                 store.setSelectedId(c.id)
//                                 setIsEditing(false)
//                                 if (isMobile) setShowMobileContacts(false)
//                             }}
//                             className={`mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors ${store.selectedId === c.id && !isEditing
//                                 ? 'bg-primary text-primary-foreground'
//                                 : 'hover:bg-default-100'
//                                 }`}>
//                             <Avatar name={c.name} size="sm" />
//                             <span className="font-medium">{c.name}</span>
//                         </div>
//                     ))}
//                     {filtered.length === 0 && (
//                         <div className="text-default-500 py-8 text-center">
//                             No contacts found
//                         </div>
//                     )}
//                 </div>
//             </div>
//         ),
//         [filtered, store.selectedId, isEditing, isMobile, store.setSelectedId]
//     )
//     const SidebarContent = useCallback(
//         () => (
//             <div className="flex h-full flex-col py-4">
//                 <div className="text-default-500 px-4 pb-2 text-xs font-semibold">
//                     All Contacts
//                 </div>
//                 <div
//                     onClick={() => {
//                         store.setActiveGroup('all')
//                         setIsEditing(false)
//                     }}
//                     className={`mx-2 cursor-pointer rounded-lg px-4 py-2 transition-colors ${store.activeGroup === 'all'
//                         ? 'bg-primary/10 text-primary font-medium'
//                         : 'hover:bg-default-100'
//                         }`}>
//                     All Contacts
//                 </div>
//                 <Separator className="my-2" />
//                 <div className="text-default-500 px-4 pt-2 pb-1 text-xs font-semibold">
//                     iCloud
//                 </div>
//                 <div
//                     onClick={() => {
//                         store.setActiveGroup('iCloud')
//                         setIsEditing(false)
//                     }}
//                     className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${store.activeGroup === 'iCloud'
//                         ? 'bg-primary/10 text-primary font-medium'
//                         : 'hover:bg-default-100'
//                         }`}>
//                     <span>All iCloud</span>
//                     <Chip size="sm" variant="tertiary">
//                         {getGroupCount('iCloud')}
//                     </Chip>
//                 </div>
//                 <div className="text-default-500 px-4 pt-4 pb-1 text-xs font-semibold">
//                     On My Mac
//                 </div>
//                 <div
//                     onClick={() => {
//                         store.setActiveGroup('onMyMac')
//                         setIsEditing(false)
//                     }}
//                     className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${store.activeGroup === 'onMyMac'
//                         ? 'bg-primary/10 text-primary font-medium'
//                         : 'hover:bg-default-100'
//                         }`}>
//                     <span>All on My Mac</span>
//                     <Chip size="sm" variant="tertiary">
//                         {getGroupCount('onMyMac')}
//                     </Chip>
//                 </div>
//                 <div className="text-default-500 px-4 pt-4 pb-1 text-xs font-semibold">
//                     Other Known
//                 </div>
//                 <div
//                     onClick={() => {
//                         store.setActiveGroup('other')
//                         setIsEditing(false)
//                     }}
//                     className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${store.activeGroup === 'other'
//                         ? 'bg-primary/10 text-primary font-medium'
//                         : 'hover:bg-default-100'
//                         }`}>
//                     <span>Other Known</span>
//                     <Chip size="sm" variant="tertiary">
//                         {getGroupCount('other')}
//                     </Chip>
//                 </div>
//             </div>
//         ),
//         [store.activeGroup, getGroupCount, store.setActiveGroup]
//     )
//     if (!isMobile) {
//         return (
//             <DesktopLayout
//                 sidebarOpen={sidebarOpen}
//                 setSidebarOpen={setSidebarOpen}
//                 search={search}
//                 setSearch={setSearch}
//                 store={store}
//                 filtered={filtered}
//                 isEditing={isEditing}
//                 editFormData={editFormData}
//                 updateFormField={updateFormField}
//                 handleCancel={handleCancel}
//                 handleSave={handleSave}
//                 handleEdit={handleEdit}
//                 handleDelete={handleDelete}
//                 handleBackToContacts={handleBackToContacts}
//                 SidebarContent={SidebarContent}
//                 ContactList={ContactList}
//                 isMobile={isMobile}
//             />
//         )
//     }
//     return (
//         <MobileLayout
//             showMobileContacts={showMobileContacts}
//             setShowMobileContacts={setShowMobileContacts}
//             sidebarOpen={sidebarOpen}
//             setSidebarOpen={setSidebarOpen}
//             search={search}
//             setSearch={setSearch}
//             store={store}
//             filtered={filtered}
//             isEditing={isEditing}
//             editFormData={editFormData}
//             updateFormField={updateFormField}
//             handleCancel={handleCancel}
//             handleSave={handleSave}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//             handleBackToContacts={handleBackToContacts}
//             handleAdd={handleAdd}
//             getGroupCount={getGroupCount}
//             SidebarContent={SidebarContent}
//             ContactList={ContactList}
//             isMobile={isMobile}
//         />
//     )
// }
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Avatar, Chip, Separator, useMediaQuery } from '@vezham/react/v3'

import { Contact, useContactsStore } from '../../store/useContacts/contact'
import { DesktopLayout } from './desktop'
import { MobileLayout } from './mobile'
import { chipTva, contactListTva, iconTva, sidebarTva } from './variant'

export default function ContactsApp() {
  const store = useContactsStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [showMobileContacts, setShowMobileContacts] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<Contact>>({})
  const isMobile = useMediaQuery('(max-width: 768px)')

  const contactListStyles = contactListTva()
  const sidebarStyles = sidebarTva()
  const iconStyles = iconTva()
  const chipStyles = chipTva()

  useEffect(() => {
    if (isMobile && store.selectedId) {
      setShowMobileContacts(false)
    }
  }, [isMobile, store.selectedId])

  useEffect(() => {
    if (isMobile && !store.selectedId) {
      setShowMobileContacts(true)
    }
  }, [isMobile, store.selectedId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      if (
        (e.key === 'Delete' || e.key === 'Del') &&
        !isEditing &&
        store.selectedId &&
        !isTyping
      ) {
        e.preventDefault()
        if (
          window.confirm(
            `Are you sure you want to delete ${store.selected?.name}?`
          )
        ) {
          store.remove(store.selectedId)
          if (isMobile) {
            setShowMobileContacts(true)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditing, store.selectedId, store.selected, store.remove, isMobile])

  const handleBackToContacts = useCallback(() => {
    setShowMobileContacts(true)
    store.setSelectedId(null)
    setIsEditing(false)
  }, [store])

  const filtered = useMemo(
    () =>
      store.filteredByGroup.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [store.filteredByGroup, search]
  )

  const handleAdd = useCallback(() => {
    const defaultGroup =
      store.activeGroup === 'all' ? 'iCloud' : store.activeGroup
    setEditFormData({
      firstName: '',
      lastName: '',
      company: '',
      mobile: '',
      home: '',
      email: '',
      birthday: '',
      username: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      notes: '',
      group: defaultGroup as Contact['group']
    })
    setIsEditing(true)
    store.setSelectedId(null)
    if (isMobile) setShowMobileContacts(false)
  }, [store.activeGroup, isMobile, store])

  const handleEdit = useCallback(() => {
    if (store.selected) {
      setEditFormData({ ...store.selected })
      setIsEditing(true)
    }
  }, [store.selected])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    if (isMobile && !store.selectedId) {
      setShowMobileContacts(true)
    }
  }, [store.selectedId, isMobile])

  const handleSave = useCallback(() => {
    if (!editFormData.firstName) {
      alert('Please enter a first name')
      return
    }

    const fullName = [editFormData.firstName, editFormData.lastName]
      .filter(Boolean)
      .join(' ')

    if (store.selectedId) {
      store.update(store.selectedId, {
        ...editFormData,
        name: fullName
      })
    } else {
      store.add({
        ...editFormData,
        name: fullName,
        group: editFormData.group || 'iCloud'
      } as Omit<Contact, 'id'>)
    }
    setIsEditing(false)
  }, [editFormData, store.selectedId, store.update, store.add])

  const handleDelete = useCallback(() => {
    if (
      store.selectedId &&
      window.confirm(`Are you sure you want to delete ${store.selected?.name}?`)
    ) {
      store.remove(store.selectedId)
      if (isMobile) {
        setShowMobileContacts(true)
      }
    }
  }, [store.selectedId, store.selected, store.remove, isMobile])

  const getGroupCount = useCallback(
    (group: 'iCloud' | 'onMyMac' | 'other') => {
      return store.contacts.filter(c => c.group === group).length
    },
    [store.contacts]
  )

  const updateFormField = useCallback((field: keyof Contact, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const ContactList = useCallback(
    ({ className = '' }: { className?: string }) => (
      <div className={className}>
        <div className={contactListStyles.listContainer()}>
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => {
                store.setSelectedId(c.id)
                setIsEditing(false)
                if (isMobile) setShowMobileContacts(false)
              }}
              className={contactListStyles.contactItem({
                isSelected: store.selectedId === c.id && !isEditing
              })}>
              <Avatar
                name={c.name}
                size="sm"
                className={contactListStyles.avatar()}
              />
              <span className={contactListStyles.contactName()}>{c.name}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={contactListStyles.emptyState()}>
              No contacts found
            </div>
          )}
        </div>
      </div>
    ),
    [
      filtered,
      store.selectedId,
      isEditing,
      isMobile,
      store.setSelectedId,
      contactListStyles
    ]
  )

  const SidebarContent = useCallback(
    () => (
      <div className={sidebarStyles.container()}>
        <div className={sidebarStyles.sectionHeader()}>All Contacts</div>
        <div
          onClick={() => {
            store.setActiveGroup('all')
            setIsEditing(false)
          }}
          className={sidebarStyles.allContactsItem({
            isActive: store.activeGroup === 'all'
          })}>
          All Contacts
        </div>

        <Separator className={sidebarStyles.separator()} />

        <div className={sidebarStyles.groupHeader()}>iCloud</div>
        <div
          onClick={() => {
            store.setActiveGroup('iCloud')
            setIsEditing(false)
          }}
          className={sidebarStyles.groupItem({
            isActive: store.activeGroup === 'iCloud'
          })}>
          <span>All iCloud</span>
          <Chip size="sm" variant="tertiary" className={chipStyles()}>
            {getGroupCount('iCloud')}
          </Chip>
        </div>

        <div className={sidebarStyles.groupHeader()}>On My Mac</div>
        <div
          onClick={() => {
            store.setActiveGroup('onMyMac')
            setIsEditing(false)
          }}
          className={sidebarStyles.groupItem({
            isActive: store.activeGroup === 'onMyMac'
          })}>
          <span>All on My Mac</span>
          <Chip size="sm" variant="tertiary" className={chipStyles()}>
            {getGroupCount('onMyMac')}
          </Chip>
        </div>

        <div className={sidebarStyles.groupHeader()}>Other Known</div>
        <div
          onClick={() => {
            store.setActiveGroup('other')
            setIsEditing(false)
          }}
          className={sidebarStyles.groupItem({
            isActive: store.activeGroup === 'other'
          })}>
          <span>Other Known</span>
          <Chip size="sm" variant="tertiary" className={chipStyles()}>
            {getGroupCount('other')}
          </Chip>
        </div>
      </div>
    ),
    [
      store.activeGroup,
      getGroupCount,
      store.setActiveGroup,
      sidebarStyles,
      chipStyles
    ]
  )

  if (!isMobile) {
    return (
      <DesktopLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        search={search}
        setSearch={setSearch}
        store={store}
        filtered={filtered}
        isEditing={isEditing}
        editFormData={editFormData}
        updateFormField={updateFormField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleBackToContacts={handleBackToContacts}
        handleAdd={handleAdd}
        SidebarContent={SidebarContent}
        ContactList={ContactList}
        isMobile={isMobile}
      />
    )
  }

  return (
    <MobileLayout
      showMobileContacts={showMobileContacts}
      setShowMobileContacts={setShowMobileContacts}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      search={search}
      setSearch={setSearch}
      store={store}
      filtered={filtered}
      isEditing={isEditing}
      editFormData={editFormData}
      updateFormField={updateFormField}
      handleCancel={handleCancel}
      handleSave={handleSave}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleBackToContacts={handleBackToContacts}
      handleAdd={handleAdd}
      getGroupCount={getGroupCount}
      SidebarContent={SidebarContent}
      ContactList={ContactList}
      isMobile={isMobile}
    />
  )
}
