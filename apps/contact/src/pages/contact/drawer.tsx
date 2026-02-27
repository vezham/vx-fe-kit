import { CalendarDate, parseDate } from '@internationalized/date'
import React, { useEffect, useRef, useState } from 'react'

import {
  Button,
  DatePicker,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input
} from '@vezham/react/v2'

import { useContacts } from './data'
import { Contact } from './types'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editContact?: Contact | null
}

const ContactDrawer: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  editContact
}) => {
  const { addContact, updateContact } = useContacts()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    phone: '',
    email: '',
    address: '',
    birthday: null as CalendarDate | null, // Changed type to CalendarDate
    avatar: '',
    favorite: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Convert string date to CalendarDate
  const stringToCalendarDate = (dateString: string): CalendarDate | null => {
    try {
      // Assuming dateString is in YYYY-MM-DD format
      return parseDate(dateString.split('T')[0])
    } catch {
      return null
    }
  }

  // Convert native Date to CalendarDate
  const dateToCalendarDate = (date: Date): CalendarDate | null => {
    try {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return new CalendarDate(year, month, day)
    } catch {
      return null
    }
  }

  useEffect(() => {
    if (editContact) {
      let parsedBirthday: CalendarDate | null = null

      if (editContact.birthday) {
        if (typeof editContact.birthday === 'string') {
          parsedBirthday = stringToCalendarDate(editContact.birthday)
        } else if (editContact.birthday instanceof Date) {
          parsedBirthday = dateToCalendarDate(editContact.birthday)
        } else {
          // If it's already in the right format, use it directly
          parsedBirthday = editContact.birthday as any
        }
      }

      setForm({
        firstName: editContact.firstName ?? '',
        lastName: editContact.lastName ?? '',
        company: editContact.company ?? '',
        jobTitle: editContact.jobTitle ?? '',
        phone: editContact.phones?.[0] ?? '',
        email: editContact.emails?.[0] ?? '',
        address: editContact.addresses?.[0] ?? '',
        birthday: parsedBirthday,
        avatar: editContact.avatar ?? '',
        favorite: editContact.favorite ?? false
      })
    } else {
      setForm({
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        phone: '',
        email: '',
        address: '',
        birthday: null,
        avatar: '',
        favorite: false
      })
      setErrors({})
    }
  }, [editContact])

  const validateField = (key: string, value: string) => {
    let message = ''

    if (key === 'firstName') {
      if (!value.trim()) message = 'First name is required'
    }

    if (key === 'phone') {
      if (!value.trim()) {
        message = 'Phone number is required'
      } else if (!/^[0-9]{10}$/.test(value)) {
        message = 'Phone must be exactly 10 digits'
      }
    }

    if (key === 'email' && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email'
      }
    }

    setErrors(prev => ({ ...prev, [key]: message }))
  }

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (typeof value === 'string') {
      validateField(key, value)
    }
  }

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        avatar: reader.result as string
      }))
    }
    reader.readAsDataURL(file)
  }

  const isFormValid = () => {
    return (
      form.firstName.trim().length > 0 &&
      /^[0-9]{10}$/.test(form.phone) &&
      (!form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    )
  }

  const handleSave = (onClose: () => void) => {
    if (!isFormValid()) return

    const timestamp = new Date().toISOString()

    // Convert CalendarDate to ISO string for storage
    let birthdayString: string | undefined = undefined
    if (form.birthday) {
      try {
        // If it's a CalendarDate, convert to YYYY-MM-DD
        if (form.birthday instanceof CalendarDate) {
          birthdayString = form.birthday.toString()
        } else {
          // Fallback for other formats
          birthdayString = new Date(form.birthday as any).toISOString()
        }
      } catch {
        // Ignore conversion errors
      }
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName || undefined,
      avatar: form.avatar || undefined,
      company: form.company || undefined,
      jobTitle: form.jobTitle || undefined,
      phones: [form.phone],
      emails: form.email ? [form.email] : undefined,
      addresses: form.address ? [form.address] : undefined,
      birthday: birthdayString,
      favorite: form.favorite
    }

    if (editContact) {
      updateContact({
        ...editContact,
        ...payload,
        updatedAt: timestamp
      })
    } else {
      addContact({
        id: Date.now(),
        ...payload,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    }

    onClose()

    setForm({
      firstName: '',
      lastName: '',
      company: '',
      jobTitle: '',
      phone: '',
      email: '',
      address: '',
      birthday: null,
      avatar: '',
      favorite: false
    })
    setErrors({})
  }

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader>
              {editContact ? 'Edit Contact' : 'New Contact'}
            </DrawerHeader>

            <DrawerBody className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  {form.avatar ? (
                    <img
                      src={form.avatar}
                      className="h-full w-full object-cover"
                      alt="avatar"
                    />
                  ) : (
                    <span>No Photo</span>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleAvatarUpload(file)
                  }}
                />

                <Button size="sm" onPress={() => fileInputRef.current?.click()}>
                  Upload Photo
                </Button>
              </div>

              <Input
                autoFocus
                label="First Name "
                value={form.firstName}
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName}
                isRequired
                onChange={e => handleChange('firstName', e.target.value)}
              />

              <Input
                label="Last Name"
                value={form.lastName}
                onChange={e => handleChange('lastName', e.target.value)}
              />

              <Input
                label="Phone"
                maxLength={10}
                value={form.phone}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone}
                isRequired
                onChange={e =>
                  handleChange('phone', e.target.value.replace(/\D/g, ''))
                }
              />

              <Input
                label="Email"
                value={form.email}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                onChange={e => handleChange('email', e.target.value)}
              />

              <Input
                label="Company"
                value={form.company}
                onChange={e => handleChange('company', e.target.value)}
              />

              <Input
                label="Job Title"
                value={form.jobTitle}
                onChange={e => handleChange('jobTitle', e.target.value)}
              />

              <Input
                label="Address"
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
              />

              <DatePicker
                label="Birthday"
                value={form.birthday}
                onChange={(date: CalendarDate | null) =>
                  handleChange('birthday', date)
                }
                className="max-w-full"
              />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>

              <Button
                color="primary"
                isDisabled={!isFormValid()}
                onPress={() => handleSave(onClose)}>
                Save
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export { ContactDrawer }
