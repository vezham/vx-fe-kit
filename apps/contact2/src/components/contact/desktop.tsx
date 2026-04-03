// import { Icon } from '@iconify/react'
// import { memo } from 'react'
// import { Button, Input, Surface } from '@vezham/react/v3'
// import { Contact } from '../../store/useContacts/contact'
// import { ContactForm } from './add'
// import { ContactDetail } from './details'
// interface DesktopLayoutProps {
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
//     SidebarContent: React.ComponentType
//     ContactList: React.ComponentType<{ className?: string }>
//     isMobile: boolean
// }
// export const DesktopLayout = memo(({
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
//     SidebarContent,
//     ContactList,
//     isMobile
// }: DesktopLayoutProps) => {
//     return (
//         <div className="flex h-screen w-full overflow-hidden bg-white">
//             <Surface
//                 className={`flex flex-col border-r transition-all duration-300 ${sidebarOpen ? 'w-[260px]' : 'w-0 overflow-hidden p-0'
//                     }`}
//                 variant="tertiary">
//                 {sidebarOpen && (
//                     <div className="h-full overflow-y-auto">
//                         <SidebarContent />
//                     </div>
//                 )}
//             </Surface>
//             <Surface
//                 className={`flex flex-col border-r transition-all duration-300 ${sidebarOpen ? 'w-[320px]' : 'w-[550px]'
//                     }`}
//                 variant="tertiary">
//                 <div className="border-b p-4">
//                     <div className="flex items-center justify-between">
//                         <Button
//                             isIconOnly
//                             variant="tertiary"
//                             onClick={() => setSidebarOpen(p => !p)}
//                             className="text-default-500">
//                             <Icon icon="lucide:panel-left" className="text-xl" />
//                         </Button>
//                         <div className="flex items-center gap-1">
//                             {store.selected && !isEditing && (
//                                 <Button
//                                     variant="tertiary"
//                                     onClick={handleEdit}
//                                     className="font-medium">
//                                     Edit
//                                 </Button>
//                             )}
//                             {!isEditing && (
//                                 <Button
//                                     isIconOnly
//                                     variant="tertiary"
//                                     onClick={handleAdd}
//                                     className="text-primary">
//                                     <Icon icon="lucide:plus" className="text-xl" />
//                                 </Button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="px-4 py-3">
//                     <Input
//                         placeholder="Search All iCloud..."
//                         value={search}
//                         onChange={e => setSearch(e.target.value)}
//                         startContent={
//                             <Icon icon="lucide:search" className="text-default-400" />
//                         }
//                         className="w-full"
//                     />
//                 </div>
//                 <ContactList className="flex-1 overflow-y-auto pb-4" />
//             </Surface>
//             <div className="bg-default-50 flex flex-1 flex-col overflow-hidden">
//                 {isEditing ? (
//                     <ContactForm
//                         editFormData={editFormData}
//                         updateFormField={updateFormField}
//                         handleCancel={handleCancel}
//                         handleSave={handleSave}
//                         isMobile={isMobile}
//                     />
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
//         </div>
//     )
// })
// DesktopLayout.displayName = 'DesktopLayout'
import { Icon } from '@iconify/react'
import { memo } from 'react'

import { Button, Input, Surface } from '@vezham/react/v3'

import { ContactForm } from './add'
import { ContactDetail } from './details'
import { DesktopLayoutProps } from './types'
import {
  desktopLayoutTva,
  iconTva,
  inputTva,
  layoutTva,
  surfaceTva
} from './variant'

export const DesktopLayout = memo(
  ({
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
    SidebarContent,
    ContactList,
    isMobile
  }: DesktopLayoutProps) => {
    const layoutStyles = layoutTva({ sidebarOpen })
    const desktopStyles = desktopLayoutTva()
    const iconStyles = iconTva
    const surfaceStyles = surfaceTva()
    const inputStyles = inputTva()

    return (
      <div className={layoutStyles.desktopContainer()}>
        <Surface
          className={layoutStyles.desktopSidebarSurface()}
          variant="tertiary">
          {sidebarOpen && (
            <div className="h-full overflow-y-auto">
              <SidebarContent />
            </div>
          )}
        </Surface>

        <Surface
          className={layoutStyles.desktopContactListSurface()}
          variant="tertiary">
          <div className={desktopStyles.desktopHeader()}>
            <div className={desktopStyles.desktopHeaderInner()}>
              <Button
                isIconOnly
                variant="tertiary"
                onClick={() => setSidebarOpen(p => !p)}
                className={desktopStyles.panelButton()}>
                <Icon
                  icon="lucide:panel-left"
                  className={iconStyles({ size: 'md' })}
                />
              </Button>
              <div className={desktopStyles.desktopButtonGroup()}>
                {store.selected && !isEditing && (
                  <Button
                    variant="tertiary"
                    onClick={handleEdit}
                    className={desktopStyles.editButton()}>
                    Edit
                  </Button>
                )}
                {!isEditing && (
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={handleAdd}
                    className={desktopStyles.addButton()}>
                    <Icon
                      icon="lucide:plus"
                      className={iconStyles({ size: 'md' })}
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className={desktopStyles.desktopSearchContainer()}>
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

          <ContactList className="flex-1 overflow-y-auto pb-4" />
        </Surface>

        <div className={layoutStyles.desktopContentArea()}>
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
)

DesktopLayout.displayName = 'DesktopLayout'
