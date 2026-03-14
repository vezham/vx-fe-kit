export type SidebarItem = {
  id: string
  label: string
  icon?: string
  children?: SidebarItem[]
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export const settingsSidebar: SidebarSection[] = [
  {
    title: 'USER SETTINGS',
    items: [
      {
        id: 'account',
        label: 'My Account',
        icon: 'solar:user-linear'
      },
      {
        id: 'content-social',
        label: 'Content & Social',
        icon: 'solar:share-linear'
      },
      {
        id: 'privacy',
        label: 'Data & Privacy',
        icon: 'solar:shield-check-linear',
        children: [
          {
            id: 'privacy-data',
            label: 'Data Settings'
          },
          {
            id: 'privacy-export',
            label: 'Export Data'
          }
        ]
      },
      {
        id: 'devices',
        label: 'Devices',
        icon: 'solar:devices-linear'
      }
    ]
  },
  {
    title: 'BILLING SETTINGS',
    items: [
      {
        id: 'nitro',
        label: 'Nitro',
        icon: 'solar:star-linear'
      },
      {
        id: 'subscriptions',
        label: 'Subscriptions',
        icon: 'solar:card-linear'
      },
      {
        id: 'billing',
        label: 'Billing',
        icon: 'solar:wallet-linear'
      }
    ]
  },
  {
    title: 'APP SETTINGS',
    items: [
      {
        id: 'appearance',
        label: 'Appearance',
        icon: 'solar:palette-linear'
      },
      {
        id: 'voice-video',
        label: 'Voice & Video',
        icon: 'solar:videocamera-linear'
      },
      {
        id: 'chat',
        label: 'Chat',
        icon: 'solar:chat-round-dots-linear'
      },
      {
        id: 'advanced',
        label: 'Advanced',
        icon: 'solar:settings-linear'
      }
    ]
  },
  {
    title: 'ACTIVITY SETTINGS',
    items: [
      {
        id: 'privacy',
        label: 'Activity Privacy',
        icon: 'solar:palette-linear',
        children: [
          {
            id: 'activity-sharing',
            label: 'Activity Sharing'
          },
          {
            id: 'servers',
            label: 'Servers I Share With'
          },
          {
            id: 'games',
            label: 'Who Can Join My Games'
          }
        ]
      }
    ]
  },
  {
    title: '',
    items: [
      {
        id: 'logout',
        label: 'Log Out',
        icon: 'solar:palette-linear'
      }
    ]
  }
]
