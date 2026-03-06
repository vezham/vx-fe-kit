// 'use client'

// import { Icon } from '@iconify/react'
// import React from 'react'

// import { Divider } from '@vezham/react/v2'
// import { Button, Dropdown, Label, Separator, Surface } from '@vezham/react/v3'

// import { ContainerActionsProps } from './types'

// export const ContainerActions: React.FC<ContainerActionsProps> = ({
//   showSearch = true,
//   showAdd = true,
//   showMore = true,
//   onSearch,
//   onAdd
// }) => {
//   return (
//     <Surface
//       variant="transparent"
//       className="fixed right-5 bottom-10 z-50 flex flex-col gap-4 sm:static sm:right-auto sm:bottom-auto sm:z-auto sm:flex-row lg:bg-transparent">
//       {showSearch && (
//         <Button
//           isIconOnly
//           variant="tertiary"
//           size="md"
//           className="shadow-md"
//           onPress={() => onSearch?.('')}>
//           <Icon icon="mdi:magnify" width={24} />
//         </Button>
//       )}

//       {(showAdd || showMore) && (
//         <div className="border-default-200 flex flex-col items-center overflow-hidden rounded-full border shadow-lg lg:flex-row">
//           {showAdd && (
//             <Button
//               isIconOnly
//               size="md"
//               variant="tertiary"
//               className="rounded-none"
//               onPress={onAdd}>
//               <Icon icon="mdi:plus" width={24} />
//             </Button>
//           )}

//           {showAdd && showMore && (
//             <div className="hidden lg:block">
//               <Divider orientation="vertical" />
//             </div>
//           )}
//           {showAdd && showMore && (
//             <div className="lg:hidden">
//               <Divider />
//             </div>
//           )}

//           {showMore && (
//             <Dropdown>
//               <Dropdown.Trigger>
//                 <Button
//                   isIconOnly
//                   size="md"
//                   variant="tertiary"
//                   className="rounded-none">
//                   <Icon icon="mdi:dots-horizontal" width={24} />
//                 </Button>
//               </Dropdown.Trigger>

//               <Dropdown.Popover>
//                 <Dropdown.Menu>
//                   {showAdd && (
//                     <Dropdown.Item key="add" onPress={onAdd}>
//                       <Label>Add</Label>
//                     </Dropdown.Item>
//                   )}

//                   <Dropdown.Item key="export">
//                     <Label>Export</Label>
//                   </Dropdown.Item>

//                   <Dropdown.Item key="download">
//                     <Label>Download</Label>
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//       )}
//     </Surface>
//   )
// }

'use client'

import { Icon } from '@iconify/react'
import React from 'react'

import { Button, Dropdown, Label, Surface } from '@vezham/react/v3'

import { ContainerActionsProps } from './types'

// 'use client'

// import { Icon } from '@iconify/react'
// import React from 'react'

// import { Divider } from '@vezham/react/v2'
// import { Button, Dropdown, Label, Separator, Surface } from '@vezham/react/v3'

// import { ContainerActionsProps } from './types'

// export const ContainerActions: React.FC<ContainerActionsProps> = ({
//   showSearch = true,
//   showAdd = true,
//   showMore = true,
//   onSearch,
//   onAdd
// }) => {
//   return (
//     <Surface
//       variant="transparent"
//       className="fixed right-5 bottom-10 z-50 flex flex-col gap-4 sm:static sm:right-auto sm:bottom-auto sm:z-auto sm:flex-row lg:bg-transparent">
//       {showSearch && (
//         <Button
//           isIconOnly
//           variant="tertiary"
//           size="md"
//           className="shadow-md"
//           onPress={() => onSearch?.('')}>
//           <Icon icon="mdi:magnify" width={24} />
//         </Button>
//       )}

//       {(showAdd || showMore) && (
//         <div className="border-default-200 flex flex-col items-center overflow-hidden rounded-full border shadow-lg lg:flex-row">
//           {showAdd && (
//             <Button
//               isIconOnly
//               size="md"
//               variant="tertiary"
//               className="rounded-none"
//               onPress={onAdd}>
//               <Icon icon="mdi:plus" width={24} />
//             </Button>
//           )}

//           {showAdd && showMore && (
//             <div className="hidden lg:block">
//               <Divider orientation="vertical" />
//             </div>
//           )}
//           {showAdd && showMore && (
//             <div className="lg:hidden">
//               <Divider />
//             </div>
//           )}

//           {showMore && (
//             <Dropdown>
//               <Dropdown.Trigger>
//                 <Button
//                   isIconOnly
//                   size="md"
//                   variant="tertiary"
//                   className="rounded-none">
//                   <Icon icon="mdi:dots-horizontal" width={24} />
//                 </Button>
//               </Dropdown.Trigger>

//               <Dropdown.Popover>
//                 <Dropdown.Menu>
//                   {showAdd && (
//                     <Dropdown.Item key="add" onPress={onAdd}>
//                       <Label>Add</Label>
//                     </Dropdown.Item>
//                   )}

//                   <Dropdown.Item key="export">
//                     <Label>Export</Label>
//                   </Dropdown.Item>

//                   <Dropdown.Item key="download">
//                     <Label>Download</Label>
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//       )}
//     </Surface>
//   )
// }

export const ContainerActions: React.FC<ContainerActionsProps> = ({
  actions
}) => {
  const visibleActions = actions.filter(a => a.visible !== false)

  return (
    <Surface
      variant="transparent"
      className="fixed right-5 bottom-10 z-50 flex flex-col gap-4 sm:static sm:flex-row sm:justify-end">
      {visibleActions.map(action => {
        if (action.type === 'dropdown') {
          return (
            <Dropdown key={action.key}>
              <Dropdown.Trigger>
                <Button isIconOnly size="md" variant="tertiary">
                  <Icon icon={action.icon!} width={24} />
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  {action.items?.map(item => (
                    <Dropdown.Item key={item.key} onPress={item.onPress}>
                      <Label>{item.label}</Label>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )
        }

        return (
          <Button
            key={action.key}
            isIconOnly
            variant="tertiary"
            size="md"
            onPress={action.onPress}>
            <Icon icon={action.icon!} width={24} />
          </Button>
        )
      })}
    </Surface>
  )
}
