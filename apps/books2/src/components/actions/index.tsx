import { Icon } from '@iconify/react'
import React from 'react'

import { Divider } from '@vezham/react/v2'
import { Button, Dropdown, Label, Surface } from '@vezham/react/v3'

import { ContainerActionsProps, HeaderProps } from './types'

// import { Icon } from '@iconify/react'
// import React from 'react'

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
//       className="fixed right-10 bottom-24 z-50 flex flex-col gap-4 md:right-5 md:bottom-10 lg:static lg:right-auto lg:bottom-auto lg:z-auto lg:flex-row lg:bg-transparent">
//       {showSearch && (
//         <Button
//           isIconOnly
//           variant="tertiary"
//           size="sm"
//           className="hidden shadow-md md:flex"
//           onPress={() => onSearch?.('')}>
//           <Icon icon="mdi:magnify" width={24} />
//         </Button>
//       )}

//       {(showAdd || showMore) && (
//         <div className="bg-primary flex flex-col items-center overflow-hidden rounded-full text-white shadow-lg lg:flex-row">
//           {showAdd && (
//             <Button
//               isIconOnly
//               size="sm"
//               variant="primary"
//               className="rounded-none"
//               onPress={onAdd}>
//               <Icon icon="mdi:plus" width={24} />
//             </Button>
//           )}

//           {showAdd && showMore && (
//             <div className="hidden lg:block">
//               <Separator orientation="vertical" />
//             </div>
//           )}
//           {showAdd && showMore && (
//             <div className="lg:hidden">
//               <Separator />
//             </div>
//           )}

//           {showMore && (
//             <Dropdown>
//               <Dropdown.Trigger>
//                 <Button
//                   isIconOnly
//                   size="sm"
//                   variant="primary"
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

  const searchAction = visibleActions.find(a => a.key === 'search')
  const addAction = visibleActions.find(a => a.key === 'add')
  const moreAction = visibleActions.find(a => a.key === 'more')

  return (
    <Surface
      variant="transparent"
      className="fixed right-10 bottom-24 z-50 flex flex-col gap-4 md:right-5 md:bottom-10 lg:static lg:right-auto lg:bottom-auto lg:z-auto lg:flex-row lg:bg-transparent">
      {searchAction && (
        <Button
          isIconOnly
          variant="tertiary"
          size="md"
          className="hidden shadow-md md:flex"
          onPress={searchAction.onPress}>
          <Icon icon={searchAction.icon!} width={24} />
        </Button>
      )}

      {(addAction || moreAction) && (
        <div className="border-default-200 flex flex-col items-center overflow-hidden rounded-full border shadow-lg lg:flex-row">
          {addAction && (
            <Button
              isIconOnly
              size="md"
              variant="primary"
              className="rounded-none"
              onPress={addAction.onPress}>
              <Icon icon={addAction.icon!} width={24} />
            </Button>
          )}

          {addAction && moreAction && (
            <div className="hidden lg:block">
              <Divider orientation="vertical" />
            </div>
          )}

          {addAction && moreAction && (
            <div className="lg:hidden">
              <Divider />
            </div>
          )}

          {moreAction && (
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  isIconOnly
                  size="md"
                  variant="primary"
                  className="rounded-none">
                  <Icon icon={moreAction.icon!} width={24} />
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  {moreAction.items?.map(item => (
                    <Dropdown.Item key={item.key} onPress={item.onPress}>
                      <Label>{item.label}</Label>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      )}
    </Surface>
  )
}

export const HeaderActions: React.FC<HeaderProps> = ({
  showBack = false,
  onBack,
  showClose = false,
  onClose,
  actions = [],
  currentIndex = 0,
  total = 0,
  onPrev,
  onNext
}) => {
  const visibleActions = actions.filter(a => a.visible !== false)

  return (
    <Surface
      variant="transparent"
      className="flex items-center justify-between py-2">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">
        {showBack && (
          <Button isIconOnly size="sm" variant="ghost" onPress={onBack}>
            <Icon icon="mdi:arrow-left" width={20} />
          </Button>
        )}

        {showClose && (
          <Button isIconOnly size="sm" variant="ghost" onPress={onClose}>
            <Icon icon="mdi:close" width={20} />
          </Button>
        )}

        {visibleActions.map(action => (
          <Button
            key={action.key}
            isIconOnly
            size="sm"
            variant="ghost"
            onPress={action.onClick}>
            <Icon icon={action.icon} width={20} />
          </Button>
        ))}
      </div>

      {/* RIGHT SIDE */}
      {total > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-default-500 text-sm">
            {currentIndex + 1} of {total}
          </span>

          <Button isIconOnly size="sm" variant="ghost" onPress={onPrev}>
            <Icon icon="mdi:chevron-left" width={22} />
          </Button>

          <Button isIconOnly size="sm" variant="ghost" onPress={onNext}>
            <Icon icon="mdi:chevron-right" width={22} />
          </Button>
        </div>
      )}
    </Surface>
  )
}
