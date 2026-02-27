export const sidebarStyles = {
  container: 'flex flex-col',
  listboxItem: {
    base: 'data-[hover=true]:bg-default/20 data-[hover=true]:text-default-400 gap-4',
    selected: 'bg-default/20 text-default-400'
  },
  compactItem: {
    base: 'hover:bg-default/20 flex cursor-pointer justify-center rounded-md w-full px-1 mb-1',
    selected: 'bg-default/20 text-primary'
  },
  icon: {
    base: 'text-default-500',
    selected: 'text-black'
  }
}
