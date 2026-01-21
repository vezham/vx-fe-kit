// variant.ts

export const sidebarFooterVariants = {
  container: (isCompact: boolean) =>
    isCompact
      ? 'mt-auto  flex flex-row items-center gap-3 '
      : 'mt-auto  flex flex-row',

  buttonGroup: (isCompact: boolean) =>
    isCompact ? '' : 'flex justify-between items-center',

  iconButton: (buttonTextColor?: string) =>
    `${buttonTextColor ?? ''} rounded-lg`,

  directionButton: (isDarkMode: boolean) =>
    `rounded-lg ${
      isDarkMode
        ? ' hover:bg-neutral-600 text-white'
        : ' hover:bg-neutral-300 text-black'
    }`,

  directionIcon: (isDarkMode: boolean) =>
    isDarkMode ? 'text-white' : 'text-black',

  avatarContainer: 'flex items-center justify-start gap-2  mt-3',

  userInfoName: (buttonTextColor?: string) =>
    `text-sm font-medium ${buttonTextColor ?? ''}`,

  userInfoRole: (isDarkMode: boolean) =>
    `text-tiny ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
}
