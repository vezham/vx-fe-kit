// import { Icon } from '@iconify/react'
// import React from 'react'
// import { Divider } from '@vezham/react/v2'
// import { Button, Dropdown, Label, Surface } from '@vezham/react/v3'
// import { ContainerActionsProps, HeaderProps } from './types'
// export const ContainerActions: React.FC<ContainerActionsProps> = ({
//   actions
// }) => {
//   const visibleActions = actions.filter(a => a.visible !== false)
//   const searchAction = visibleActions.find(a => a.key === 'search')
//   const addAction = visibleActions.find(a => a.key === 'add')
//   const moreAction = visibleActions.find(a => a.key === 'more')
//   return (
//     <Surface
//       variant="transparent"
//       className="fixed right-10 bottom-24 z-50 flex flex-col gap-4 md:right-5 md:bottom-10 lg:static lg:right-auto lg:bottom-auto lg:z-auto lg:flex-row lg:bg-transparent">
//       {searchAction && (
//         <Button
//           isIconOnly
//           variant="tertiary"
//           size="md"
//           className="hidden shadow-md md:flex"
//           onPress={searchAction.onPress}>
//           <Icon icon={searchAction.icon!} width={24} />
//         </Button>
//       )}
//       {(addAction || moreAction) && (
//         <div className="border-default-200 flex flex-col items-center overflow-hidden rounded-full border shadow-lg lg:flex-row">
//           {addAction && (
//             <Button
//               isIconOnly
//               size="md"
//               variant="primary"
//               className="rounded-none"
//               onPress={addAction.onPress}>
//               <Icon icon={addAction.icon!} width={24} />
//             </Button>
//           )}
//           {addAction && moreAction && (
//             <div className="hidden lg:block">
//               <Divider orientation="vertical" />
//             </div>
//           )}
//           {addAction && moreAction && (
//             <div className="lg:hidden">
//               <Divider />
//             </div>
//           )}
//           {moreAction && (
//             <Dropdown>
//               <Dropdown.Trigger>
//                 <Button
//                   isIconOnly
//                   size="md"
//                   variant="primary"
//                   className="rounded-none">
//                   <Icon icon={moreAction.icon!} width={24} />
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Popover>
//                 <Dropdown.Menu>
//                   {moreAction.items?.map(item => (
//                     <Dropdown.Item key={item.key} onPress={item.onPress}>
//                       <Label>{item.label}</Label>
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//       )}
//     </Surface>
//   )
// }
// export const HeaderActions: React.FC<HeaderProps> = ({
//   showBack = false,
//   onBack,
//   showClose = false,
//   onClose,
//   actions = [],
//   currentIndex = 0,
//   total = 0,
//   onPrev,
//   onNext
// }) => {
//   const visibleActions = actions.filter(a => a.visible !== false)
//   return (
//     <Surface
//       variant="transparent"
//       className="flex items-center justify-between py-2">
//       <div className="flex items-center gap-2">
//         {showClose && (
//           <Button isIconOnly size="sm" variant="ghost" onPress={onClose}>
//             <Icon icon="mdi:close" width={20} />
//           </Button>
//         )}
//         {visibleActions.map(action => (
//           <Button
//             key={action.key}
//             isIconOnly
//             size="sm"
//             variant="ghost"
//             onPress={action.onClick}>
//             <Icon icon={action.icon} width={20} />
//           </Button>
//         ))}
//       </div>
//       {total > 0 && (
//         <div className="flex items-center gap-3">
//           <span className="text-default-500 text-sm">
//             {currentIndex + 1} of {total}
//           </span>
//           <Button isIconOnly size="sm" variant="ghost" onPress={onPrev}>
//             <Icon icon="mdi:chevron-left" width={22} />
//           </Button>
//           <Button isIconOnly size="sm" variant="ghost" onPress={onNext}>
//             <Icon icon="mdi:chevron-right" width={22} />
//           </Button>
//         </div>
//       )}
//     </Surface>
//   )
// }
import { Icon } from '@iconify/react'

import { forwardRef } from '@vezham/react-utils'
import { Divider } from '@vezham/react/v2'
import { Button, Dropdown, Label, Surface } from '@vezham/react/v3'

import { ContainerActionsProps, HeaderProps, Props, useProps } from './types'

const ContainerActions = forwardRef<'div', ContainerActionsProps>(
  (props, ref) => {
    const { Component, slots, classNames, actions, getBaseProps } = useProps({
      ...props,
      ref
    })

    const visibleActions = actions.filter(a => a.visible !== false)
    const searchAction = visibleActions.find(a => a.key === 'search')
    const addAction = visibleActions.find(a => a.key === 'add')
    const moreAction = visibleActions.find(a => a.key === 'more')

    return (
      <Component {...getBaseProps()}>
        <Surface
          variant="transparent"
          className={slots.surface({ class: classNames?.surface })}>
          {searchAction && (
            <Button
              isIconOnly
              variant="tertiary"
              size="md"
              className={slots.searchButton({
                class: classNames?.searchButton
              })}
              onPress={searchAction.onPress}>
              <Icon icon={searchAction.icon!} width={24} />
            </Button>
          )}

          {(addAction || moreAction) && (
            <div
              className={slots.actionGroup({ class: classNames?.actionGroup })}>
              {addAction && (
                <Button
                  isIconOnly
                  size="md"
                  variant="primary"
                  className={slots.addButton({ class: classNames?.addButton })}
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
                      className={slots.moreButton({
                        class: classNames?.moreButton
                      })}>
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
      </Component>
    )
  }
)

ContainerActions.displayName = 'ContainerActions'

const HeaderActions = forwardRef<'div', HeaderProps>((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    showBack,
    onBack,
    showClose,
    onClose,
    actions,
    currentIndex,
    total,
    onPrev,
    onNext,
    getBaseProps
  } = useProps({
    ...props,
    ref
  })

  const visibleActions = (actions || []).filter(a => a.visible !== false)

  return (
    <Component>
      <Surface
        variant="transparent"
        className={slots.header({ class: classNames?.header })}>
        <div className={slots.leftSection({ class: classNames?.leftSection })}>
          {showClose && (
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              className={slots.closeButton({ class: classNames?.closeButton })}
              onPress={onClose}>
              <Icon icon="mdi:close" width={20} />
            </Button>
          )}
          {visibleActions.map(action => (
            <Button
              key={action.key}
              isIconOnly
              size="sm"
              variant="ghost"
              className={slots.actionButton({
                class: classNames?.actionButton
              })}
              onPress={action.onClick}>
              <Icon icon={action.icon} width={20} />
            </Button>
          ))}
        </div>

        {(total || 0) > 0 && (
          <div
            className={slots.rightSection({ class: classNames?.rightSection })}>
            <span className={slots.counter({ class: classNames?.counter })}>
              {(currentIndex || 0) + 1} of {total}
            </span>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              className={slots.prevButton({ class: classNames?.prevButton })}
              onPress={onPrev}>
              <Icon icon="mdi:chevron-left" width={22} />
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              className={slots.nextButton({ class: classNames?.nextButton })}
              onPress={onNext}>
              <Icon icon="mdi:chevron-right" width={22} />
            </Button>
          </div>
        )}
      </Surface>
    </Component>
  )
})

HeaderActions.displayName = 'HeaderActions'

export { ContainerActions, HeaderActions }
export type { ContainerActionsProps, HeaderProps }
