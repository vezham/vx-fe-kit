// export const HeaderVariants = {
//   container: (isCompact: boolean) =>
//     isCompact
//       ? 'flex items-center justify-between w-full '
//       : 'flex items-center justify-between px-2 mb-5',

//   icon: (buttonTextColor?: string, isCompact?: boolean) =>
//     `${buttonTextColor ?? ''} ${isCompact ? 'w-8' : 'w-6'}`,

//   button: (buttonTextColor?: string) => `${buttonTextColor ?? ''} rounded-lg`,

//   chevronIcon: (
//     buttonTextColor?: string,
//     isCompact?: boolean,
//     isRightSidebar?: boolean
//   ) =>
//     `${buttonTextColor ?? ''} ${isCompact ? 'w-3' : 'w-[10px]'} ${
//       isRightSidebar ? 'rotate-180' : ''
//     }`,

//   compactSlackButton: () =>
//     'flex items-center gap-1 justify-center p-2 rounded-full hover:bg-content2 transition-colors cursor-pointer min-w-[40px] min-h-[40px]',

//   compactChevron: () => 'text-default-600 text-[16px]',

//   expandedSlackButton: () =>
//     'flex items-center gap-1 px-2 py-1 rounded-full hover:bg-content2 transition-colors cursor-pointer select-none min-w-[40px] min-h-[40px]',

//   expandedChevron: (isOpen: boolean) =>
//     `text-muted text-[16px] transition-transform duration-200 ${
//       isOpen ? 'rotate-180' : 'rotate-0'
//     }`
// }

// export const userPopoverCardVariants = {
//   card: () => 'max-w-[260px] border-none bg-transparent shadow-none',
//   name: () => 'text-small font-semibold leading-none text-muted',
//   username: () => 'text-small tracking-tight text-muted-500',
//   bio: () => 'text-small pl-px text-muted-500',
//   statNumber: () => 'font-semibold text-muted text-small',
//   statLabel: () => 'text-muted-500 text-small'
// }


import { VariantProps, tv } from '@vezham/react-utils'

const tva = tv({
  slots: {
    base: '',
    container: '',
    compactSlackButton: 'flex items-center gap-1 justify-center p-2 rounded-full hover:bg-content2 transition-colors cursor-pointer min-w-[40px] min-h-[40px]',
    expandedContainer: 'flex items-center gap-3',
    expandedSlackButton: 'flex items-center gap-1 px-2 py-1 rounded-full hover:bg-content2 transition-colors cursor-pointer select-none min-w-[40px] min-h-[40px]',
    icon: '',
    compactChevron: 'text-default-600 text-[16px]',
    expandedChevron: 'text-muted text-[16px] transition-transform duration-200',
    avatarTrigger: 'cursor-pointer',
    avatar: '',
    popoverContent: 'relative z-[9999] p-1',
    popoverArrow: '',

    card: 'max-w-[260px] border-none bg-transparent shadow-none',
    cardHeader: 'justify-between',
    userInfo: 'flex gap-3',
    userDetails: 'flex flex-col items-start justify-center',
    name: 'text-small font-semibold leading-none text-muted',
    username: 'text-small tracking-tight text-muted-500',
    followButton: '',
    cardDescription: 'px-3 py-0',
    bio: 'text-small pl-px text-muted-500',
    cardFooter: 'gap-3',
    statGroup: 'flex gap-1',
    statNumber: 'font-semibold text-muted text-small',
    statLabel: 'text-muted-500 text-small'
  },
  variants: {
    variant: {
      default: ''
    },
    isCompact: {
      true: '',
      false: ''
    },
    color: {
      default: '',
      primary: '',
      secondary: ''
    },
    isOpen: {
      true: 'rotate-180',
      false: 'rotate-0'
    }
  },
  defaultVariants: {
    variant: 'default',
    isCompact: false,
    color: 'default',
    isOpen: false
  },
  compoundVariants: [
    {
      isCompact: true,
      class: {
        container: 'flex items-center justify-between w-full'
      }
    },
    {
      isCompact: false,
      class: {
        container: 'flex items-center justify-between px-2 mb-5'
      }
    },
    {
      isCompact: true,
      class: {
        icon: 'w-8'
      }
    },
    {
      isCompact: false,
      class: {
        icon: 'w-6'
      }
    }
  ]
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
