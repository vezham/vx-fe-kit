// import { useNavigate } from '@tanstack/react-router'
// import React from 'react'
// import { Surface, Tabs } from '@vezham/react/v3'
// import { ContainerTabsProps } from './types'
// export const ContainerTabs: React.FC<ContainerTabsProps> = ({
//   tabs,
//   selectedKey,
//   onSelectionChange
// }) => {
//   const navigate = useNavigate()
//   const handleChange = (key: string) => {
//     onSelectionChange(key)
//     const tab = tabs.find(t => t.key === key)
//     if (tab?.href) {
//       navigate({ to: tab.href })
//     }
//   }
//   return (
//     <Surface variant="transparent" className="w-full min-w-0">
//       <Tabs
//         className="w-[250px] sm:w-auto"
//         selectedKey={selectedKey}
//         onSelectionChange={key => handleChange(String(key))}>
//         <Tabs.ListContainer className="w-full min-w-0">
//           <div className="scrollbar-hide w-full overflow-x-auto rounded-full">
//             <Tabs.List
//               aria-label="Options"
//               className="flex w-max min-w-full whitespace-nowrap">
//               {tabs.map(tab => (
//                 <Tabs.Tab key={tab.key} id={tab.key}>
//                   {tab.title}
//                   <Tabs.Indicator />
//                 </Tabs.Tab>
//               ))}
//             </Tabs.List>
//           </div>
//         </Tabs.ListContainer>
//       </Tabs>
//     </Surface>
//   )
// }
import { useNavigate } from '@tanstack/react-router'

import { forwardRef } from '@vezham/react-utils'
import { Surface, Tabs } from '@vezham/react/v3'

import { Props, useProps } from './types'

const ContainerTabs = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    tabs,
    selectedKey,
    onSelectionChange,
    getBaseProps
  } = useProps({
    ...props,
    ref
  })

  const navigate = useNavigate()

  const handleChange = (key: string) => {
    onSelectionChange(key)

    const tab = tabs.find(t => t.key === key)

    if (tab?.href) {
      navigate({ to: tab.href })
    }
  }

  return (
    <Component {...getBaseProps()}>
      <Surface
        variant="transparent"
        className={slots.surface({ class: classNames?.surface })}>
        <Tabs
          className={slots.tabs({ class: classNames?.tabs })}
          selectedKey={selectedKey}
          onSelectionChange={key => handleChange(String(key))}>
          <Tabs.ListContainer
            className={slots.listContainer({
              class: classNames?.listContainer
            })}>
            <div
              className={slots.scrollContainer({
                class: classNames?.scrollContainer
              })}>
              <Tabs.List
                aria-label="Options"
                className={slots.tabsList({ class: classNames?.tabsList })}>
                {tabs.map(tab => (
                  <Tabs.Tab
                    key={tab.key}
                    id={tab.key}
                    className={slots.tab({ class: classNames?.tab })}>
                    {tab.title}
                    <Tabs.Indicator
                      className={slots.indicator({
                        class: classNames?.indicator
                      })}
                    />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </div>
          </Tabs.ListContainer>
        </Tabs>
      </Surface>
    </Component>
  )
})

ContainerTabs.displayName = 'ContainerTabs'

export { ContainerTabs }
