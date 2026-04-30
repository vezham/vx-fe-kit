import { VariantProps, tv } from '@vezham/react-utils'

const tva = tv({
  slots: {
    base: 'bg-background flex min-h-screen min-w-0 flex-1 flex-col',
    header:
      'border-default-200 bg-background sticky top-0 z-30 border-b px-3 py-2 sm:px-4',
    header_inner: 'flex min-h-12 items-center justify-between gap-3',
    header_left: 'flex min-w-0 flex-1 items-center gap-1',
    header_tabs_desktop: 'hidden min-w-0 flex-1 sm:block',
    header_right: 'flex shrink-0 items-center gap-1 sm:gap-2',
    header_tabs_mobile: 'flex min-w-0 justify-center pt-2 sm:hidden',
    shell: 'flex min-h-0 flex-1',
    separator: 'my-2',
    sidebar_rail:
      'border-default-200 bg-background hidden w-64 shrink-0 overflow-hidden border-r transition-all duration-300 md:block',
    sidebar_rail_closed: 'w-0 border-r-0',
    content: 'min-w-0 flex-1 overflow-auto p-4',
    content_surface: 'min-h-full rounded-lg p-4 sm:p-5',
    drawer_dialog: 'bg-background w-[min(20rem,calc(100vw-2rem))]',
    drawer_header: 'border-default-200 flex items-center justify-between',
    drawer_title: 'text-base font-semibold',
    drawer_body: '',
    icon_button: 'h-9 w-9 min-w-9 p-0',
    search_button: 'h-9 w-9 min-w-9 p-0 md:hidden',
    primary_button: 'h-9 min-w-9 px-0 md:px-3',
    inline_icon: 'shrink-0',
    search_field: 'hidden w-56 md:block',
    search_icon: 'text-muted-foreground h-4 w-4',
    primary_label: '!text-inherit',
    dropdown_label: 'flex items-center gap-2',
    sidebar: 'p-2',
    sidebar_collapsed: 'flex justify-center p-2',
    sidebar_toggle: 'mb-2 h-9 w-9 min-w-9 p-0',
    sidebar_list: 'space-y-1',
    sidebar_item:
      'text-muted hover:bg-primary/5 hover:text-muted flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal transition-colors',
    sidebar_item_active:
      'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors active:scale-95',
    sidebar_icon: 'text-muted',
    sidebar_icon_active: 'text-primary',
    sidebar_label: 'min-w-0 truncate',
    sidebar_label_active: 'text-primary min-w-0 truncate font-bold',
    tabs_scroller:
      'scrollbar-hide w-full overflow-x-auto rounded-full sm:max-w-fit',
    tabs_list: 'flex min-w-max flex-nowrap *:whitespace-nowrap',
    tabs_tab: 'whitespace-nowrap'
  },
  variants: {
    variant: {
      default: {},
      compact: {
        content: 'p-3',
        content_surface: 'p-3'
      }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
