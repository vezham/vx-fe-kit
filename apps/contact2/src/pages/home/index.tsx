import { Icon } from '@iconify/react'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { DatePicker } from '@vezham/react/v2'
import { Drawer, Textarea } from '@vezham/react/v2'
import {
  Avatar,
  Button,
  Chip,
  Input,
  Label,
  ListBox,
  Select,
  Separator,
  Surface,
  useMediaQuery
} from '@vezham/react/v3'

interface Contact {
  id: number
  name: string
  notes: string
  group?: 'iCloud' | 'onMyMac' | 'other'
  firstName?: string
  lastName?: string
  company?: string
  mobile?: string
  home?: string
  email?: string
  pronouns?: string
  ringtone?: string
  textTone?: string
  url?: string
  birthday?: string
  username?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

const useContactsStore = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Krishna',
      notes: '',
      group: 'iCloud',
      firstName: 'Krishna'
    },
    { id: 2, name: 'Vikram', notes: '', group: 'iCloud', firstName: 'Vikram' },
    {
      id: 3,
      name: 'John Appleseed',
      notes: '',
      group: 'onMyMac',
      firstName: 'John',
      lastName: 'Appleseed'
    },
    {
      id: 4,
      name: 'Jane Doe',
      notes: '',
      group: 'other',
      firstName: 'Jane',
      lastName: 'Doe'
    }
  ])
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [activeGroup, setActiveGroup] = useState<
    'all' | 'iCloud' | 'onMyMac' | 'other'
  >('all')

  const selected = useMemo(
    () => contacts.find(c => c.id === selectedId),
    [contacts, selectedId]
  )

  const filteredByGroup = useMemo(() => {
    if (activeGroup === 'all') return contacts
    return contacts.filter(c => c.group === activeGroup)
  }, [contacts, activeGroup])

  const add = useCallback((contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: Date.now() }
    setContacts(prev => [newContact, ...prev])
    setSelectedId(newContact.id)
    return newContact
  }, [])

  const update = useCallback((id: number, data: Partial<Contact>) => {
    setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)))
  }, [])

  const remove = useCallback(
    (id: number) => {
      setContacts(prev => {
        const filtered = prev.filter(c => c.id !== id)
        if (selectedId === id) {
          setSelectedId(filtered.length > 0 ? filtered[0]?.id || null : null)
        }
        return filtered
      })
    },
    [selectedId]
  )

  return {
    contacts,
    filteredByGroup,
    selected,
    selectedId,
    activeGroup,
    setActiveGroup,
    setSelectedId,
    add,
    update,
    remove
  }
}

const validatePhoneNumber = (value: string) => {
  const phoneRegex = /^\d{0,10}$/
  return phoneRegex.test(value)
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return true
  return emailRegex.test(email)
}

const ContactForm = memo(
  ({
    editFormData,
    updateFormField,
    handleCancel,
    handleSave,
    isMobile
  }: {
    editFormData: Partial<Contact>
    updateFormField: (field: keyof Contact, value: any) => void
    handleCancel: () => void
    handleSave: () => void
    isMobile: boolean
  }) => {
    const [selectedGroup, setSelectedGroup] = useState<string>(
      editFormData.group || 'iCloud'
    )
    const [phoneErrors, setPhoneErrors] = useState({ mobile: '', home: '' })
    const [emailError, setEmailError] = useState('')

    useEffect(() => {
      setSelectedGroup(editFormData.group || 'iCloud')
    }, [editFormData.group])

    const handlePhoneChange = (field: 'mobile' | 'home', value: string) => {
      if (validatePhoneNumber(value)) {
        updateFormField(field, value)
        setPhoneErrors(prev => ({ ...prev, [field]: '' }))

        if (value.length > 0 && value.length !== 10) {
          setPhoneErrors(prev => ({
            ...prev,
            [field]: 'Phone number must be exactly 10 digits'
          }))
        }
      } else {
        setPhoneErrors(prev => ({
          ...prev,
          [field]: 'Only numbers are allowed'
        }))
      }
    }

    const handleEmailChange = (value: string) => {
      updateFormField('email', value)
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }

    const handleDateChange = (date: Date | null) => {
      if (date) {
        const formattedDate = date.toISOString().split('T')[0]
        updateFormField('birthday', formattedDate)
      } else {
        updateFormField('birthday', '')
      }
    }

    const getDateValue = () => {
      if (editFormData.birthday) {
        return new Date(editFormData.birthday)
      }
      return null
    }

    return (
      <div className="flex h-full flex-1 flex-col overflow-auto bg-white">
        {isMobile && (
          <div className="sticky top-0 z-10 border-b bg-white p-4">
            <Button
              variant="ghost"
              startContent={<Icon icon="lucide:arrow-left" />}
              onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}

        <div className="flex flex-1 items-start justify-center p-8">
          <div className="flex w-full max-w-[520px] flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-48 w-48 bg-gradient-to-br from-purple-500 to-purple-700 text-5xl font-semibold text-white">
                {editFormData.firstName?.charAt(0) || '?'}
              </Avatar>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <Input
                  key="firstName-input"
                  placeholder="First Name"
                  value={editFormData.firstName || ''}
                  onChange={e => updateFormField('firstName', e.target.value)}
                  className="flex-1"
                />
                <Input
                  key="lastName-input"
                  placeholder="Last Name"
                  value={editFormData.lastName || ''}
                  onChange={e => updateFormField('lastName', e.target.value)}
                  className="flex-1"
                />
              </div>
              <Input
                key="company-input"
                placeholder="Company"
                value={editFormData.company || ''}
                onChange={e => updateFormField('company', e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant="tertiary"
                className="bg-white/20 backdrop-blur-sm"
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Contact
              </Button>
            </div>

            <div className="mt-2 flex flex-col gap-4">
              <h3 className="mb-3 font-semibold">Group</h3>
              <Select
                className="w-full"
                selectedKey={selectedGroup}
                onSelectionChange={key => {
                  setSelectedGroup(key as string)
                  updateFormField('group', key as Contact['group'])
                }}>
                <Label>Select a group</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="iCloud" textValue="iCloud">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:cloud" className="text-blue-500" />
                        <span>iCloud</span>
                      </div>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="onMyMac" textValue="On My Mac">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:laptop" className="text-gray-600" />
                        <span>On My Mac</span>
                      </div>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="other" textValue="Other Known">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:users" className="text-green-500" />
                        <span>Other Known</span>
                      </div>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Phone Numbers with Validation */}
              <h3 className="mb-3 font-semibold">Phone Numbers</h3>
              <div className="flex flex-col gap-2 md:flex-row">
                <Input
                  className="flex-1"
                  key="mobile-input"
                  placeholder="Mobile (10 digits)"
                  value={editFormData.mobile || ''}
                  onChange={e => handlePhoneChange('mobile', e.target.value)}
                  maxLength={10}
                  isInvalid={!!phoneErrors.mobile}
                  errorMessage={phoneErrors.mobile}
                />

                <Input
                  key="home-input"
                  className="flex-1"
                  placeholder="Home (10 digits)"
                  value={editFormData.home || ''}
                  onChange={e => handlePhoneChange('home', e.target.value)}
                  maxLength={10}
                  isInvalid={!!phoneErrors.home}
                  errorMessage={phoneErrors.home}
                />
              </div>

              {/* Email with Validation */}
              <h3 className="mb-3 font-semibold">Email</h3>
              <Input
                key="email-input"
                placeholder="Email"
                type="email"
                value={editFormData.email || ''}
                onChange={e => handleEmailChange(e.target.value)}
                isInvalid={!!emailError}
                errorMessage={emailError}
              />

              {/* Birthday with V2 DatePicker */}
              <h3 className="mb-3 font-semibold">Birthday</h3>
              <DatePicker
                className="w-full"
                value={getDateValue()}
                onChange={handleDateChange}
                placeholder="Select birthday"
              />

              <h3 className="mb-3 font-semibold">Username</h3>
              <Input
                key="username-input"
                placeholder="Jabber"
                value={editFormData.username || ''}
                onChange={e => updateFormField('username', e.target.value)}
              />

              <h3 className="mb-3 font-semibold">Address</h3>
              <div className="space-y-3">
                <Input
                  key="street-input"
                  placeholder="Street"
                  value={editFormData.street || ''}
                  onChange={e => updateFormField('street', e.target.value)}
                  className="w-full"
                />
                <div className="flex flex-col gap-2 md:flex-row">
                  <Input
                    key="city-input"
                    placeholder="City"
                    value={editFormData.city || ''}
                    onChange={e => updateFormField('city', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    key="state-input"
                    placeholder="State"
                    value={editFormData.state || ''}
                    onChange={e => updateFormField('state', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                  <Input
                    key="zip-input"
                    placeholder="ZIP"
                    value={editFormData.zip || ''}
                    onChange={e => updateFormField('zip', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    key="country-input"
                    placeholder="Country"
                    value={editFormData.country || ''}
                    onChange={e => updateFormField('country', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <h3 className="mb-2 font-semibold">Note</h3>
              <Textarea
                key="notes-textarea"
                placeholder="Add notes..."
                value={editFormData.notes || ''}
                onChange={e => updateFormField('notes', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ContactForm.displayName = 'ContactForm'

const ContactDetail = memo(
  ({
    selected,
    isMobile,
    handleBackToContacts,
    handleDelete,
    handleEdit
  }: {
    selected: Contact | null
    isMobile: boolean
    handleBackToContacts: () => void
    handleDelete: () => void
    handleEdit: () => void
  }) => {
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

    return (
      <div className="flex h-full flex-1 flex-col overflow-auto bg-gradient-to-br from-[#d1d5db] via-[#c4b5fd] to-[#6d28d9]">
        {isMobile && (
          <div className="sticky top-0 z-10 border-b bg-white p-4">
            <Button
              variant="ghost"
              startContent={<Icon icon="lucide:arrow-left" />}
              onClick={handleBackToContacts}>
              Back to Contacts
            </Button>
          </div>
        )}

        <div className="flex flex-1 items-start justify-center p-8">
          <div className="flex w-full max-w-[520px] flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-48 w-48 bg-white/20 text-5xl font-semibold shadow-lg backdrop-blur-sm">
                {selected.name.charAt(0)}
              </Avatar>
              <h1 className="text-3xl font-semibold tracking-tight">
                {selected.name}
              </h1>
              {selected.company && (
                <p className="text-default-600">{selected.company}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <Button
                isIconOnly
                variant="tertiary"
                className="rounded-full bg-white/20 backdrop-blur-sm"
                aria-label="Message">
                <Icon
                  icon="lucide:message-circle"
                  className="text-default-700"
                />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className="rounded-full bg-white/20 backdrop-blur-sm"
                aria-label="Call">
                <Icon icon="lucide:phone" className="text-default-700" />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className="rounded-full bg-white/20 backdrop-blur-sm"
                aria-label="Video">
                <Icon icon="lucide:video" className="text-default-700" />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className="rounded-full bg-white/20 backdrop-blur-sm"
                aria-label="Mail">
                <Icon icon="lucide:mail" className="text-default-700" />
              </Button>
              {/* <Button
                isIconOnly
                variant="tertiary"
                className="rounded-full bg-white/20 backdrop-blur-sm"
                aria-label="Delete"
                onClick={handleDelete}>
                <Icon icon="lucide:trash-2" className="text-default-700" />
              </Button>
              <Button
                isIconOnly
                variant="tertiary"
                className="rounded-full bg-white/20 backdrop-blur-sm"
                aria-label="Edit"
                onClick={handleEdit}>
                <Icon icon="lucide:edit-2" className="text-default-700" />
              </Button> */}
            </div>

            <div className="mt-2 flex flex-col gap-3">
              {selected.group && (
                <div className="rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">Group</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Icon
                      icon={
                        selected.group === 'iCloud'
                          ? 'lucide:cloud'
                          : selected.group === 'onMyMac'
                            ? 'lucide:laptop'
                            : 'lucide:users'
                      }
                      className="text-default-600"
                    />
                    <p className="font-medium">
                      {selected.group === 'iCloud'
                        ? 'iCloud'
                        : selected.group === 'onMyMac'
                          ? 'On My Mac'
                          : 'Other Known'}
                    </p>
                  </div>
                </div>
              )}

              {selected.mobile && (
                <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">Mobile</span>
                  <p className="mt-1 font-medium">{selected.mobile}</p>
                </div>
              )}

              {selected.home && (
                <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">Home</span>
                  <p className="mt-1 font-medium">{selected.home}</p>
                </div>
              )}

              {selected.email && (
                <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">Email</span>
                  <p className="mt-1 font-medium">{selected.email}</p>
                </div>
              )}

              {selected.birthday && (
                <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">Birthday</span>
                  <p className="mt-1 font-medium">
                    {formatDate(selected.birthday)}
                  </p>
                </div>
              )}

              {selected.username && (
                <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">
                    Username (Jabber)
                  </span>
                  <p className="mt-1">{selected.username}</p>
                </div>
              )}

              {selected.street && (
                <div className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                  <span className="text-default-500 text-sm">Address</span>
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

              <div className="min-h-[100px] cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                <span className="text-default-500 text-sm">Notes</span>
                <p className="text-default-700 mt-1">
                  {selected.notes || (
                    <span className="text-default-400">
                      No additional notes
                    </span>
                  )}
                </p>
              </div>

              <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                <span className="font-medium">Send Message</span>
                <Icon
                  icon="lucide:chevron-right"
                  className="text-default-400"
                />
              </div>

              <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50">
                <span className="font-medium">Share Contact</span>
                <Icon
                  icon="lucide:chevron-right"
                  className="text-default-400"
                />
              </div>

              <div className="hover:bg-danger/20 cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors">
                <span className="font-medium text-red-500">Block Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ContactDetail.displayName = 'ContactDetail'

export default function ContactsApp() {
  const store = useContactsStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [showMobileContacts, setShowMobileContacts] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<Contact>>({})
  const isMobile = useMediaQuery('(max-width: 768px)')

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
        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => {
                store.setSelectedId(c.id)
                setIsEditing(false)
                if (isMobile) setShowMobileContacts(false)
              }}
              className={`mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                store.selectedId === c.id && !isEditing
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-default-100'
              }`}>
              <Avatar name={c.name} size="sm" />
              <span className="font-medium">{c.name}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-default-500 py-8 text-center">
              No contacts found
            </div>
          )}
        </div>
      </div>
    ),
    [filtered, store.selectedId, isEditing, isMobile, store.setSelectedId]
  )

  const SidebarContent = useCallback(
    () => (
      <div className="flex h-full flex-col py-4">
        <div className="text-default-500 px-4 pb-2 text-xs font-semibold">
          All Contacts
        </div>
        <div
          onClick={() => {
            store.setActiveGroup('all')
            setIsEditing(false)
          }}
          className={`mx-2 cursor-pointer rounded-lg px-4 py-2 transition-colors ${
            store.activeGroup === 'all'
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-default-100'
          }`}>
          All Contacts
        </div>

        <Separator className="my-2" />

        <div className="text-default-500 px-4 pt-2 pb-1 text-xs font-semibold">
          iCloud
        </div>
        <div
          onClick={() => {
            store.setActiveGroup('iCloud')
            setIsEditing(false)
          }}
          className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${
            store.activeGroup === 'iCloud'
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-default-100'
          }`}>
          <span>All iCloud</span>
          <Chip size="sm" variant="tertiary">
            {getGroupCount('iCloud')}
          </Chip>
        </div>

        <div className="text-default-500 px-4 pt-4 pb-1 text-xs font-semibold">
          On My Mac
        </div>
        <div
          onClick={() => {
            store.setActiveGroup('onMyMac')
            setIsEditing(false)
          }}
          className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${
            store.activeGroup === 'onMyMac'
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-default-100'
          }`}>
          <span>All on My Mac</span>
          <Chip size="sm" variant="tertiary">
            {getGroupCount('onMyMac')}
          </Chip>
        </div>

        <div className="text-default-500 px-4 pt-4 pb-1 text-xs font-semibold">
          Other Known
        </div>
        <div
          onClick={() => {
            store.setActiveGroup('other')
            setIsEditing(false)
          }}
          className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${
            store.activeGroup === 'other'
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-default-100'
          }`}>
          <span>Other Known</span>
          <Chip size="sm" variant="tertiary">
            {getGroupCount('other')}
          </Chip>
        </div>
      </div>
    ),
    [store.activeGroup, getGroupCount, store.setActiveGroup]
  )

  // Desktop Layout
  if (!isMobile) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-white">
        <Surface
          className={`flex flex-col border-r transition-all duration-300 ${
            sidebarOpen ? 'w-[260px]' : 'w-0 overflow-hidden p-0'
          }`}
          variant="tertiary">
          {sidebarOpen && (
            <div className="h-full overflow-y-auto">
              <SidebarContent />
            </div>
          )}
        </Surface>

        <Surface
          className={`flex flex-col border-r transition-all duration-300 ${
            sidebarOpen ? 'w-[320px]' : 'w-[550px]'
          }`}
          variant="tertiary">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <Button
                isIconOnly
                variant="tertiary"
                onClick={() => setSidebarOpen(p => !p)}
                className="text-default-500">
                <Icon icon="lucide:panel-left" className="text-xl" />
              </Button>
              <div className="flex items-center gap-1">
                {store.selected && !isEditing && (
                  <Button
                    variant="tertiary"
                    onClick={handleEdit}
                    className="font-medium">
                    Edit
                  </Button>
                )}
                {!isEditing && (
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={handleAdd}
                    className="text-primary">
                    <Icon icon="lucide:plus" className="text-xl" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="px-4 py-3">
            <Input
              placeholder="Search All iCloud..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              startContent={
                <Icon icon="lucide:search" className="text-default-400" />
              }
              className="w-full"
            />
          </div>

          {/* Contacts List */}
          <ContactList className="flex-1 overflow-y-auto pb-4" />
        </Surface>

        <div className="bg-default-50 flex flex-1 flex-col overflow-hidden">
          {isEditing ? (
            <ContactForm
              editFormData={editFormData}
              updateFormField={updateFormField}
              handleCancel={handleCancel}
              handleSave={handleSave}
              isMobile={isMobile}
            />
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
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!showMobileContacts && !isEditing && (
              <Button
                isIconOnly
                variant="tertiary"
                onClick={handleBackToContacts}>
                <Icon icon="lucide:arrow-left" className="text-xl" />
              </Button>
            )}
            {isEditing && (
              <Button isIconOnly variant="tertiary" onClick={handleCancel}>
                <Icon icon="lucide:arrow-left" className="text-xl" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">
              {isEditing
                ? store.selectedId
                  ? 'Edit Contact'
                  : 'New Contact'
                : showMobileContacts
                  ? 'All Contacts'
                  : store.selected?.name || 'Contact'}
            </h1>
          </div>
          <div className="flex gap-1">
            {showMobileContacts && !isEditing && (
              <>
                <Button
                  isIconOnly
                  variant="tertiary"
                  onClick={handleAdd}
                  className="text-primary">
                  <Icon icon="lucide:plus" className="text-xl" />
                </Button>
                <Button
                  isIconOnly
                  variant="tertiary"
                  onClick={() => setSidebarOpen(true)}>
                  <Icon icon="lucide:menu" className="text-xl" />
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
          <div className="mt-3">
            <Input
              placeholder="Search All iCloud..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              startContent={
                <Icon icon="lucide:search" className="text-default-400" />
              }
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
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
            {/* Group Chips */}
            <div className="sticky top-0 z-10 flex gap-2 overflow-x-auto border-b bg-white p-3">
              {[
                { id: 'all', label: 'All Contacts' },
                { id: 'iCloud', label: 'iCloud' },
                { id: 'onMyMac', label: 'On My Mac' },
                { id: 'other', label: 'Other Known' }
              ].map(group => (
                <Chip
                  key={group.id}
                  variant={store.activeGroup === group.id ? 'solid' : 'flat'}
                  color={store.activeGroup === group.id ? 'primary' : 'default'}
                  className="cursor-pointer"
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
            <ContactList className="h-full overflow-y-auto pb-20" />
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

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        side="left"
        size="sm">
        <div className="h-full p-4">
          <div className="mb-4 flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold">Groups</h2>
            <Button
              isIconOnly
              variant="tertiary"
              onClick={() => setSidebarOpen(false)}>
              <Icon icon="lucide:x" className="text-xl" />
            </Button>
          </div>
          <SidebarContent />
        </div>
      </Drawer>
    </div>
  )
}
