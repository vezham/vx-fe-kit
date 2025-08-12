// variant.ts

export const sidebarStyles = {
  // Styles for the main container
  container: 'flex flex-col gap-1',

  // Styles for a single listbox item
  listboxItem: {
    base: 'data-[hover=true]:bg-default/20 data-[hover=true]:text-default-400 ',
    selected: 'bg-default/20 text-default-400'
  },

  // Styles for a compact single item
  compactItem: {
    base: 'hover:bg-default/20 flex cursor-pointer justify-center rounded-md p-2',
    selected: 'bg-default/20 text-white'
  },

  // Styles for nested items
  nestedItem: {
    container: 'flex flex-col',
    header: {
      base: 'flex cursor-pointer text-default-400  items-center justify-between rounded-md px-3 py-2',
      selected: 'bg-default/20 text-default-200',
      unselected: 'hover:bg-default/20 hover:text-default-400 text-default-400'
    },
    title: 'text-small font-medium',
    subheader: 'border-default-200 mt-1 ml-4 border-l pl-4'
  },

  // Styles for icon elements
  icon: {
    base: 'text-default-500',
    selected: 'text-black',
    nestedSelected: 'text-default-400'
  },

  // Other utility styles used in the component
  gapHalf: 'gap-0.5',
  button: 'h-8 w-8 min-w-8',
  flexCenterGap2: 'flex items-center gap-2'
}
