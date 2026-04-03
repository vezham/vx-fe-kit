// import { Icon } from '@iconify/react'
// import { memo, useEffect, useState } from 'react'
// import { DatePicker } from '@vezham/react/v2'
// import { Textarea } from '@vezham/react/v2'
// import { Avatar, Button, Input, Label, ListBox, Select } from '@vezham/react/v3'
// import { Contact } from '../../store/useContacts/contact'
// const validatePhoneNumber = (value: string) => {
//     const phoneRegex = /^\d{0,10}$/
//     return phoneRegex.test(value)
// }
// const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!email) return true
//     return emailRegex.test(email)
// }
// interface ContactFormProps {
//     editFormData: Partial<Contact>
//     updateFormField: (field: keyof Contact, value: any) => void
//     handleCancel: () => void
//     handleSave: () => void
//     isMobile: boolean
// }
// export const ContactForm = memo(({
//     editFormData,
//     updateFormField,
//     handleCancel,
//     handleSave,
//     isMobile
// }: ContactFormProps) => {
//     const [selectedGroup, setSelectedGroup] = useState<string>(
//         editFormData.group || 'iCloud'
//     )
//     const [phoneErrors, setPhoneErrors] = useState({ mobile: '', home: '' })
//     const [emailError, setEmailError] = useState('')
//     useEffect(() => {
//         setSelectedGroup(editFormData.group || 'iCloud')
//     }, [editFormData.group])
//     const handlePhoneChange = (field: 'mobile' | 'home', value: string) => {
//         if (validatePhoneNumber(value)) {
//             updateFormField(field, value)
//             setPhoneErrors(prev => ({ ...prev, [field]: '' }))
//             if (value.length > 0 && value.length !== 10) {
//                 setPhoneErrors(prev => ({
//                     ...prev,
//                     [field]: 'Phone number must be exactly 10 digits'
//                 }))
//             }
//         } else {
//             setPhoneErrors(prev => ({
//                 ...prev,
//                 [field]: 'Only numbers are allowed'
//             }))
//         }
//     }
//     const handleEmailChange = (value: string) => {
//         updateFormField('email', value)
//         if (value && !validateEmail(value)) {
//             setEmailError('Please enter a valid email address')
//         } else {
//             setEmailError('')
//         }
//     }
//     const handleDateChange = (date: Date | null) => {
//         if (date) {
//             const formattedDate = date.toISOString().split('T')[0]
//             updateFormField('birthday', formattedDate)
//         } else {
//             updateFormField('birthday', '')
//         }
//     }
//     const getDateValue = () => {
//         if (editFormData.birthday) {
//             return new Date(editFormData.birthday)
//         }
//         return null
//     }
//     return (
//         <div className="flex h-full flex-1 flex-col overflow-auto bg-white">
//             {isMobile && (
//                 <div className="sticky top-0 z-10 border-b bg-white p-4">
//                     <Button
//                         variant="ghost"
//                         startContent={<Icon icon="lucide:arrow-left" />}
//                         onClick={handleCancel}>
//                         Cancel
//                     </Button>
//                 </div>
//             )}
//             <div className="flex flex-1 items-start justify-center p-8">
//                 <div className="flex w-full max-w-[520px] flex-col gap-6">
//                     <div className="flex flex-col items-center gap-4">
//                         <Avatar className="h-48 w-48 bg-gradient-to-br from-purple-500 to-purple-700 text-5xl font-semibold text-white">
//                             {editFormData.firstName?.charAt(0) || '?'}
//                         </Avatar>
//                         <div className="flex md:flex-row flex-col w-full gap-2">
//                             <Input
//                                 key="firstName-input"
//                                 placeholder="First Name"
//                                 value={editFormData.firstName || ''}
//                                 onChange={e => updateFormField('firstName', e.target.value)}
//                                 className="flex-1"
//                             />
//                             <Input
//                                 key="lastName-input"
//                                 placeholder="Last Name"
//                                 value={editFormData.lastName || ''}
//                                 onChange={e => updateFormField('lastName', e.target.value)}
//                                 className="flex-1"
//                             />
//                         </div>
//                         <Input
//                             key="company-input"
//                             placeholder="Company"
//                             value={editFormData.company || ''}
//                             onChange={e => updateFormField('company', e.target.value)}
//                             className="w-full"
//                         />
//                     </div>
//                     <div className="flex justify-center gap-3">
//                         <Button
//                             variant="tertiary"
//                             className="bg-white/20 backdrop-blur-sm"
//                             onClick={handleCancel}>
//                             Cancel
//                         </Button>
//                         <Button variant="primary" onClick={handleSave}>
//                             Save Contact
//                         </Button>
//                     </div>
//                     <div className="mt-2 flex flex-col gap-4">
//                         <h3 className="mb-3 font-semibold">Group</h3>
//                         <Select
//                             className="w-full"
//                             selectedKey={selectedGroup}
//                             onSelectionChange={key => {
//                                 setSelectedGroup(key as string)
//                                 updateFormField('group', key as Contact['group'])
//                             }}>
//                             <Label>Select a group</Label>
//                             <Select.Trigger>
//                                 <Select.Value />
//                                 <Select.Indicator />
//                             </Select.Trigger>
//                             <Select.Popover>
//                                 <ListBox>
//                                     <ListBox.Item id="iCloud" textValue="iCloud">
//                                         <div className="flex items-center gap-2">
//                                             <Icon icon="lucide:cloud" className="text-blue-500" />
//                                             <span>iCloud</span>
//                                         </div>
//                                         <ListBox.ItemIndicator />
//                                     </ListBox.Item>
//                                     <ListBox.Item id="onMyMac" textValue="On My Mac">
//                                         <div className="flex items-center gap-2">
//                                             <Icon icon="lucide:laptop" className="text-gray-600" />
//                                             <span>On My Mac</span>
//                                         </div>
//                                         <ListBox.ItemIndicator />
//                                     </ListBox.Item>
//                                     <ListBox.Item id="other" textValue="Other Known">
//                                         <div className="flex items-center gap-2">
//                                             <Icon icon="lucide:users" className="text-green-500" />
//                                             <span>Other Known</span>
//                                         </div>
//                                         <ListBox.ItemIndicator />
//                                     </ListBox.Item>
//                                 </ListBox>
//                             </Select.Popover>
//                         </Select>
//                         <h3 className="mb-3 font-semibold">Phone Numbers</h3>
//                         <div className="flex md:flex-row flex-col gap-2">
//                             <Input
//                                 className='flex-1'
//                                 key="mobile-input"
//                                 placeholder="Mobile (10 digits)"
//                                 value={editFormData.mobile || ''}
//                                 onChange={e => handlePhoneChange('mobile', e.target.value)}
//                                 maxLength={10}
//                                 isInvalid={!!phoneErrors.mobile}
//                                 errorMessage={phoneErrors.mobile}
//                             />
//                             <Input
//                                 key="home-input"
//                                 className='flex-1'
//                                 placeholder="Home (10 digits)"
//                                 value={editFormData.home || ''}
//                                 onChange={e => handlePhoneChange('home', e.target.value)}
//                                 maxLength={10}
//                                 isInvalid={!!phoneErrors.home}
//                                 errorMessage={phoneErrors.home}
//                             />
//                         </div>
//                         <h3 className="mb-3 font-semibold">Email</h3>
//                         <Input
//                             key="email-input"
//                             placeholder="Email"
//                             type="email"
//                             value={editFormData.email || ''}
//                             onChange={e => handleEmailChange(e.target.value)}
//                             isInvalid={!!emailError}
//                             errorMessage={emailError}
//                         />
//                         <h3 className="mb-3 font-semibold">Birthday</h3>
//                         <DatePicker
//                             className="w-full"
//                             value={getDateValue()}
//                             onChange={handleDateChange}
//                             placeholder="Select birthday"
//                         />
//                         <h3 className="mb-3 font-semibold">Username</h3>
//                         <Input
//                             key="username-input"
//                             placeholder="Jabber"
//                             value={editFormData.username || ''}
//                             onChange={e => updateFormField('username', e.target.value)}
//                         />
//                         <h3 className="mb-3 font-semibold">Address</h3>
//                         <div className="space-y-3">
//                             <Input
//                                 key="street-input"
//                                 placeholder="Street"
//                                 value={editFormData.street || ''}
//                                 onChange={e => updateFormField('street', e.target.value)}
//                                 className="w-full"
//                             />
//                             <div className="flex md:flex-row flex-col gap-2">
//                                 <Input
//                                     key="city-input"
//                                     placeholder="City"
//                                     value={editFormData.city || ''}
//                                     onChange={e => updateFormField('city', e.target.value)}
//                                     className="flex-1"
//                                 />
//                                 <Input
//                                     key="state-input"
//                                     placeholder="State"
//                                     value={editFormData.state || ''}
//                                     onChange={e => updateFormField('state', e.target.value)}
//                                     className="flex-1"
//                                 />
//                             </div>
//                             <div className="flex md:flex-row flex-col gap-2">
//                                 <Input
//                                     key="zip-input"
//                                     placeholder="ZIP"
//                                     value={editFormData.zip || ''}
//                                     onChange={e => updateFormField('zip', e.target.value)}
//                                     className="flex-1"
//                                 />
//                                 <Input
//                                     key="country-input"
//                                     placeholder="Country"
//                                     value={editFormData.country || ''}
//                                     onChange={e => updateFormField('country', e.target.value)}
//                                     className="flex-1"
//                                 />
//                             </div>
//                         </div>
//                         <h3 className="mb-2 font-semibold">Note</h3>
//                         <Textarea
//                             key="notes-textarea"
//                             placeholder="Add notes..."
//                             value={editFormData.notes || ''}
//                             onChange={e => updateFormField('notes', e.target.value)}
//                             rows={4}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// })
// ContactForm.displayName = 'ContactForm'
import { Icon } from '@iconify/react'
import { memo, useEffect, useState } from 'react'

import { DatePicker } from '@vezham/react/v2'
import { Textarea } from '@vezham/react/v2'
import { Avatar, Button, Input, Label, ListBox, Select } from '@vezham/react/v3'

import { Contact } from '../../store/useContacts/contact'
import {
  ContactFormProps,
  ContactFormState,
  validateEmail,
  validatePhoneNumber
} from './types'
import {
  contactFormTva,
  datePickerTva,
  iconTva,
  inputTva,
  selectTva,
  textareaTva
} from './variant'

export const ContactForm = memo(
  ({
    editFormData,
    updateFormField,
    handleCancel,
    handleSave,
    isMobile
  }: ContactFormProps) => {
    const styles = contactFormTva()
    const iconStyles = iconTva
    const selectStyles = selectTva()
    const inputStyles = inputTva()
    const datePickerStyles = datePickerTva
    const textareaStyles = textareaTva

    const [state, setState] = useState<ContactFormState>({
      selectedGroup: editFormData.group || 'iCloud',
      phoneErrors: { mobile: '', home: '' },
      emailError: ''
    })

    useEffect(() => {
      setState(prev => ({
        ...prev,
        selectedGroup: editFormData.group || 'iCloud'
      }))
    }, [editFormData.group])

    const handlePhoneChange = (field: 'mobile' | 'home', value: string) => {
      if (validatePhoneNumber(value)) {
        updateFormField(field, value)
        setState(prev => ({
          ...prev,
          phoneErrors: { ...prev.phoneErrors, [field]: '' }
        }))

        if (value.length > 0 && value.length !== 10) {
          setState(prev => ({
            ...prev,
            phoneErrors: {
              ...prev.phoneErrors,
              [field]: 'Phone number must be exactly 10 digits'
            }
          }))
        }
      } else {
        setState(prev => ({
          ...prev,
          phoneErrors: {
            ...prev.phoneErrors,
            [field]: 'Only numbers are allowed'
          }
        }))
      }
    }

    const handleEmailChange = (value: string) => {
      updateFormField('email', value)
      if (value && !validateEmail(value)) {
        setState(prev => ({
          ...prev,
          emailError: 'Please enter a valid email address'
        }))
      } else {
        setState(prev => ({ ...prev, emailError: '' }))
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
              onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}

        <div className={styles.contentWrapper()}>
          <div className={styles.formWrapper()}>
            <div className={styles.avatarContainer()}>
              <Avatar className={styles.avatar()}>
                {editFormData.firstName?.charAt(0) || '?'}
              </Avatar>
              <div className={styles.nameRow()}>
                <Input
                  placeholder="First Name"
                  value={editFormData.firstName || ''}
                  onChange={e => updateFormField('firstName', e.target.value)}
                  className={styles.flexInput()}
                />
                <Input
                  placeholder="Last Name"
                  value={editFormData.lastName || ''}
                  onChange={e => updateFormField('lastName', e.target.value)}
                  className={styles.flexInput()}
                />
              </div>
              <Input
                placeholder="Company"
                value={editFormData.company || ''}
                onChange={e => updateFormField('company', e.target.value)}
                className={styles.fullWidthInput()}
              />
            </div>

            <div className={styles.buttonRow()}>
              <Button
                variant="tertiary"
                className={styles.cancelButton()}
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Contact
              </Button>
            </div>

            <div className="mt-2 flex flex-col gap-4">
              <h3 className={styles.sectionTitle()}>Group</h3>
              <Select
                className="w-full"
                selectedKey={state.selectedGroup}
                onSelectionChange={key => {
                  setState(prev => ({ ...prev, selectedGroup: key as string }))
                  updateFormField('group', key as Contact['group'])
                }}>
                <Label>Select a group</Label>
                <Select.Trigger className={selectStyles.trigger()}>
                  <Select.Value className={selectStyles.value()} />
                  <Select.Indicator className={selectStyles.indicator()} />
                </Select.Trigger>
                <Select.Popover className={selectStyles.popover()}>
                  <ListBox className={selectStyles.listbox()}>
                    <ListBox.Item id="iCloud" textValue="iCloud">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="lucide:cloud"
                          className={iconStyles({ color: 'blue' })}
                        />
                        <span>iCloud</span>
                      </div>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="onMyMac" textValue="On My Mac">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="lucide:laptop"
                          className={iconStyles({ color: 'gray' })}
                        />
                        <span>On My Mac</span>
                      </div>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="other" textValue="Other Known">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="lucide:users"
                          className={iconStyles({ color: 'green' })}
                        />
                        <span>Other Known</span>
                      </div>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <h3 className={styles.sectionTitle()}>Phone Numbers</h3>
              <div className={styles.phoneRow()}>
                <Input
                  className={styles.flexInput()}
                  placeholder="Mobile (10 digits)"
                  value={editFormData.mobile || ''}
                  onChange={e => handlePhoneChange('mobile', e.target.value)}
                  maxLength={10}
                  isInvalid={!!state.phoneErrors.mobile}
                  errorMessage={state.phoneErrors.mobile}
                />
                <Input
                  className={styles.flexInput()}
                  placeholder="Home (10 digits)"
                  value={editFormData.home || ''}
                  onChange={e => handlePhoneChange('home', e.target.value)}
                  maxLength={10}
                  isInvalid={!!state.phoneErrors.home}
                  errorMessage={state.phoneErrors.home}
                />
              </div>

              <h3 className={styles.sectionTitle()}>Email</h3>
              <Input
                placeholder="Email"
                type="email"
                value={editFormData.email || ''}
                onChange={e => handleEmailChange(e.target.value)}
                isInvalid={!!state.emailError}
                errorMessage={state.emailError}
              />

              <h3 className={styles.sectionTitle()}>Birthday</h3>
              <DatePicker
                className={datePickerStyles()}
                value={getDateValue()}
                onChange={handleDateChange}
                placeholder="Select birthday"
              />

              <h3 className={styles.sectionTitle()}>Username</h3>
              <Input
                placeholder="Jabber"
                value={editFormData.username || ''}
                onChange={e => updateFormField('username', e.target.value)}
              />

              <h3 className={styles.sectionTitle()}>Address</h3>
              <div className={styles.addressContainer()}>
                <Input
                  placeholder="Street"
                  value={editFormData.street || ''}
                  onChange={e => updateFormField('street', e.target.value)}
                  className={styles.fullWidthInput()}
                />
                <div className={styles.addressRow()}>
                  <Input
                    placeholder="City"
                    value={editFormData.city || ''}
                    onChange={e => updateFormField('city', e.target.value)}
                    className={styles.flexInput()}
                  />
                  <Input
                    placeholder="State"
                    value={editFormData.state || ''}
                    onChange={e => updateFormField('state', e.target.value)}
                    className={styles.flexInput()}
                  />
                </div>
                <div className={styles.addressRow()}>
                  <Input
                    placeholder="ZIP"
                    value={editFormData.zip || ''}
                    onChange={e => updateFormField('zip', e.target.value)}
                    className={styles.flexInput()}
                  />
                  <Input
                    placeholder="Country"
                    value={editFormData.country || ''}
                    onChange={e => updateFormField('country', e.target.value)}
                    className={styles.flexInput()}
                  />
                </div>
              </div>

              <h3 className={styles.noteTitle()}>Note</h3>
              <Textarea
                placeholder="Add notes..."
                value={editFormData.notes || ''}
                onChange={e => updateFormField('notes', e.target.value)}
                rows={4}
                className={textareaStyles()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ContactForm.displayName = 'ContactForm'
