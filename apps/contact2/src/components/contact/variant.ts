import { tv } from '@vezham/react/v3'

// Layout variants
export const layoutTva = tv({
  slots: {
    desktopContainer: 'flex h-screen w-full overflow-hidden bg-white',
    mobileContainer: 'flex h-screen w-full flex-col overflow-hidden bg-white',
    desktopSidebarSurface: 'flex flex-col border-r transition-all duration-300',
    desktopContactListSurface:
      'flex flex-col border-r transition-all duration-300',
    desktopContentArea: 'bg-default-50 flex flex-1 flex-col overflow-hidden',
    drawerContainer: 'h-full p-4',
    drawerHeader: 'mb-4 flex items-center justify-between border-b pb-2',
    drawerTitle: 'text-lg font-semibold'
  },
  variants: {
    sidebarOpen: {
      true: {
        desktopSidebarSurface: 'w-[260px]',
        desktopContactListSurface: 'w-[320px]'
      },
      false: {
        desktopSidebarSurface: 'w-0 overflow-hidden p-0',
        desktopContactListSurface: 'w-[550px]'
      }
    }
  }
})

// Mobile Layout variants
export const mobileLayoutTva = tv({
  slots: {
    container: 'flex h-screen w-full flex-col overflow-hidden bg-white',
    header: 'border-b bg-white p-4',
    headerTop: 'flex items-center justify-between',
    headerLeft: 'flex items-center gap-2',
    headerTitle: 'text-xl font-semibold',
    headerActions: 'flex gap-1',
    searchWrapper: 'mt-3',
    chipContainer:
      'sticky top-0 z-10 flex gap-2 overflow-x-auto border-b bg-white p-3',
    contactListContainer: 'h-full overflow-y-auto pb-20',
    contentArea: 'flex-1 overflow-hidden',
    drawerContainer: 'h-full p-4',
    drawerHeader: 'mb-4 flex items-center justify-between border-b pb-2',
    drawerTitle: 'text-lg font-semibold'
  },
  variants: {
    variant: {
      default: {}
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

// Contact form variants
export const contactFormTva = tv({
  slots: {
    container: 'flex h-full flex-1 flex-col overflow-auto bg-white',
    mobileHeader: 'sticky top-0 z-10 border-b bg-white p-4',
    contentWrapper: 'flex flex-1 items-start justify-center p-8',
    formWrapper: 'flex w-full max-w-[520px] flex-col gap-6',
    avatarContainer: 'flex flex-col items-center gap-4',
    avatar:
      'h-48 w-48 bg-gradient-to-br from-purple-500 to-purple-700 text-5xl font-semibold text-white',
    nameRow: 'flex w-full flex-col gap-2 md:flex-row',
    fullWidthInput: 'w-full',
    buttonRow: 'flex justify-center gap-3',
    cancelButton: 'bg-white/20 backdrop-blur-sm',
    sectionTitle: 'font-semibold',
    phoneRow: 'flex flex-col gap-2 md:flex-row',
    flexInput: 'flex-1',
    addressContainer: 'space-y-3',
    addressRow: 'flex flex-col gap-2 md:flex-row',
    noteTitle: 'mb-2 font-semibold'
  },
  variants: {
    variant: {
      default: {}
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

// Contact detail variants
export const contactDetailTva = tv({
  slots: {
    container:
      'flex h-full flex-1 flex-col overflow-auto bg-gradient-to-br from-[#d1d5db] via-[#c4b5fd] to-[#6d28d9]',
    mobileHeader: 'sticky top-0 z-10 border-b bg-white p-4',
    contentWrapper: 'flex flex-1 items-start justify-center p-8',
    detailWrapper: 'flex w-full max-w-[520px] flex-col gap-6',
    avatarContainer: 'flex flex-col items-center gap-4',
    avatar:
      'h-48 w-48 bg-white/20 text-5xl font-semibold shadow-lg backdrop-blur-sm',
    name: 'text-3xl font-semibold tracking-tight',
    company: 'text-default-600',
    actionButtons: 'flex justify-center gap-3',
    actionButton: 'rounded-full bg-white/20 backdrop-blur-sm',
    infoContainer: 'mt-2 flex flex-col gap-3',
    infoCard:
      'rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50',
    infoCardCursor:
      'cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50',
    infoCardDanger:
      'hover:bg-danger/20 cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors',
    infoLabel: 'text-default-500 text-sm',
    infoValue: 'mt-1 font-medium',
    infoValueWithIcon: 'mt-1 flex items-center gap-2',
    flexBetween:
      'flex cursor-pointer items-center justify-between rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50',
    notesCard:
      'min-h-[100px] cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/50',
    notesText: 'text-default-700 mt-1',
    noNotes: 'text-default-400',
    dangerText: 'font-medium text-red-500'
  },
  variants: {
    variant: {
      default: {}
    }
  }
})

// Desktop layout variants
export const desktopLayoutTva = tv({
  slots: {
    desktopHeader: 'border-b p-4',
    desktopHeaderInner: 'flex items-center justify-between',
    desktopButtonGroup: 'flex items-center gap-1',
    desktopSearchContainer: 'px-4 py-3',
    panelButton: 'text-default-500',
    editButton: 'font-medium',
    addButton: 'text-primary'
  },
  variants: {
    variant: {
      default: {}
    }
  }
})

// Contact list variants
export const contactListTva = tv({
  slots: {
    container: '',
    listContainer: 'flex-1 overflow-y-auto',
    contactItem:
      'mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors',
    avatar: '',
    contactName: 'font-medium',
    emptyState: 'text-default-500 py-8 text-center'
  },
  variants: {
    isSelected: {
      true: {
        contactItem: 'bg-primary text-primary-foreground'
      },
      false: {
        contactItem: 'hover:bg-default-100'
      }
    }
  }
})

// Sidebar variants
export const sidebarTva = tv({
  slots: {
    container: 'flex h-full flex-col py-4',
    sectionHeader: 'text-default-500 px-4 pb-2 text-xs font-semibold',
    allContactsItem:
      'mx-2 cursor-pointer rounded-lg px-4 py-2 transition-colors',
    separator: 'my-2',
    groupHeader: 'text-default-500 px-4 pt-2 pb-1 text-xs font-semibold',
    groupItem:
      'mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors'
  },
  variants: {
    isActive: {
      true: {
        allContactsItem: 'bg-primary/10 text-primary font-medium',
        groupItem: 'bg-primary/10 text-primary font-medium'
      },
      false: {
        allContactsItem: 'hover:bg-default-100',
        groupItem: 'hover:bg-default-100'
      }
    }
  }
})

// Icon variants
export const iconTva = tv({
  base: '',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-xl',
      lg: 'text-2xl'
    },
    color: {
      default: 'text-default-400',
      primary: 'text-primary',
      blue: 'text-blue-500',
      gray: 'text-gray-600',
      green: 'text-green-500',
      white: 'text-white'
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'default'
  }
})

// Chip variants
export const chipTva = tv({
  base: 'cursor-pointer',
  variants: {
    variant: {
      solid: '',
      flat: ''
    },
    color: {
      primary: '',
      default: ''
    },
    size: {
      sm: ''
    }
  }
})

// Select variants
export const selectTva = tv({
  slots: {
    trigger: '',
    value: '',
    indicator: '',
    popover: '',
    listbox: ''
  }
})

// Input variants
export const inputTva = tv({
  slots: {
    base: '',
    input: ''
  }
})

// DatePicker variants
export const datePickerTva = tv({
  base: 'w-full'
})

// Textarea variants
export const textareaTva = tv({
  base: ''
})

// Surface variants
export const surfaceTva = tv({
  base: '',
  variants: {
    variant: {
      tertiary: ''
    }
  }
})

// Drawer variants
export const drawerTva = tv({
  base: '',
  variants: {
    side: {
      left: ''
    },
    size: {
      sm: ''
    }
  }
})

// Button variants
export const buttonTva = tv({
  base: '',
  variants: {
    variant: {
      ghost: '',
      tertiary: '',
      primary: ''
    },
    isIconOnly: {
      true: ''
    }
  }
})

export type LayoutVariants = typeof layoutTva
export type MobileLayoutVariants = typeof mobileLayoutTva
export type ContactFormVariants = typeof contactFormTva
export type ContactDetailVariants = typeof contactDetailTva
export type DesktopLayoutVariants = typeof desktopLayoutTva
export type ContactListVariants = typeof contactListTva
export type SidebarVariants = typeof sidebarTva
