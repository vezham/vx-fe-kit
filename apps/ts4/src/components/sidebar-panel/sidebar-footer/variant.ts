export const sidebarFooterVariants = {
  container: (isCompact: boolean) =>
    isCompact
      ? 'mt-auto pt-10  flex flex-col items-center gap-2'
      : 'mt-auto pt-4 flex flex-col gap-2 mb-6',

  buttonGroup: (isCompact: boolean) =>
    isCompact ? '' : 'flex justify-between items-center px-2',

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

  avatarContainer: 'flex items-center justify-start gap-5 px-2 mt-3',

  userInfoName: (buttonTextColor?: string) =>
    `text-sm font-medium ${buttonTextColor ?? ''}`,

  userInfoRole: (isDarkMode: boolean) =>
    `text-tiny ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
}
