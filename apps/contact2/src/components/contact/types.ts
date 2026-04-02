import { Contact } from '../../store/useContacts/contact'

// ContactForm Types
export interface ContactFormProps {
  editFormData: Partial<Contact>
  updateFormField: (field: keyof Contact, value: any) => void
  handleCancel: () => void
  handleSave: () => void
  isMobile: boolean
}

export interface ContactFormState {
  selectedGroup: string
  phoneErrors: { mobile: string; home: string }
  emailError: string
}

// ContactDetail Types
export interface ContactDetailProps {
  selected: Contact | null
  isMobile: boolean
  handleBackToContacts: () => void
  handleDelete: () => void
  handleEdit: () => void
}

// DesktopLayout Types
export interface DesktopLayoutProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  search: string
  setSearch: (search: string) => void
  store: any
  filtered: Contact[]
  isEditing: boolean
  editFormData: Partial<Contact>
  updateFormField: (field: keyof Contact, value: any) => void
  handleCancel: () => void
  handleSave: () => void
  handleEdit: () => void
  handleDelete: () => void
  handleBackToContacts: () => void
  SidebarContent: React.ComponentType
  ContactList: React.ComponentType<{ className?: string }>
  isMobile: boolean
  handleAdd: () => void
}

// MobileLayout Types
export interface MobileLayoutProps {
  showMobileContacts: boolean
  setShowMobileContacts: (show: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  search: string
  setSearch: (search: string) => void
  store: any
  filtered: Contact[]
  isEditing: boolean
  editFormData: Partial<Contact>
  updateFormField: (field: keyof Contact, value: any) => void
  handleCancel: () => void
  handleSave: () => void
  handleEdit: () => void
  handleDelete: () => void
  handleBackToContacts: () => void
  handleAdd: () => void
  getGroupCount: (group: 'iCloud' | 'onMyMac' | 'other') => number
  SidebarContent: React.ComponentType
  ContactList: React.ComponentType<{ className?: string }>
  isMobile: boolean
}

// ContactList Types
export interface ContactListProps {
  className?: string
  filtered: Contact[]
  store: any
  isEditing: boolean
  isMobile: boolean
  setSelectedId: (id: string) => void
  setShowMobileContacts?: (show: boolean) => void
}

// SidebarContent Types
export interface SidebarContentProps {
  store: any
  getGroupCount: (group: 'iCloud' | 'onMyMac' | 'other') => number
  setActiveGroup: (group: string) => void
  setIsEditing: (editing: boolean) => void
}

// Group Types
export interface GroupItem {
  id: string
  label: string
  icon?: string
}

// Validation Functions
export const validatePhoneNumber = (value: string) => {
  const phoneRegex = /^\d{0,10}$/
  return phoneRegex.test(value)
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return true
  return emailRegex.test(email)
}
