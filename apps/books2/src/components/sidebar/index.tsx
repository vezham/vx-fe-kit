// import { Icon } from '@iconify/react'
// import React from 'react'

// import type { SidebarProps } from './types'

// const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
//   return (
//     <aside>
//       <div>
//         <div className="w-full flex-1">{children}</div>
//       </div>
//     </aside>
//   )
// }

// export default Sidebar


import { forwardRef } from '@vezham/react-utils'

import { Props, useProps } from './types'

const Sidebar = forwardRef<'aside', Props>((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    children,
    getBaseProps
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <div className={slots.container({ class: classNames?.container })}>
        <div className={slots.contentWrapper({ class: classNames?.contentWrapper })}>
          <div className={slots.childrenContainer({ class: classNames?.childrenContainer })}>
            {children}
          </div>
        </div>
      </div>
    </Component>
  )
})

Sidebar.displayName = 'Sidebar'

export { Sidebar }
