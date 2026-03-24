import Account from '../preferences/user-settings/account'
import ContentSocial from '../preferences/user-settings/content-social'
import Privacy from '../preferences/user-settings/data-privacy'
import FamilyCenter from '../preferences/user-settings/family-center'
import Profiles from '../preferences/user-settings/profiles'

export type SidebarItem = {
  id: string
  label: string
  icon?: string
  href?: string
  component?: React.ComponentType
  children?: SidebarItem[]
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export type User = {
  name?: string
  avatarUrl?: string
}

export const settingsSidebar: SidebarSection[] = [
  {
    title: '',
    items: [
      {
        id: 'profiles',
        label: 'Krishna Prasad',
        component: Profiles
      }
    ]
  },

  {
    title: 'USER SETTINGS',
    items: [
      {
        id: 'account',
        label: 'My Account',
        icon: 'solar:user-linear',
        component: Account
      },
      {
        id: 'content-social',
        label: 'Content & Social',
        icon: 'solar:share-linear',
        component: ContentSocial
      },
      {
        id: 'privacy',
        label: 'Data & Privacy',
        icon: 'solar:shield-check-linear',

        children: [
          {
            id: 'privacy-data',
            label: 'How Discord Uses Your Data',
            component: Privacy
          },
          {
            id: 'privacy-request',
            label: 'Request your Data'
          }
        ]
      },
      {
        id: 'family-center',
        label: 'Family Center',
        icon: 'solar:devices-linear',
        component: FamilyCenter
      },
      {
        id: 'authorized-apps',
        label: 'Authorized Apps',
        icon: 'solar:devices-linear'
      },
      {
        id: 'devices',
        label: 'Devices',
        icon: 'solar:devices-linear'
      },
      {
        id: 'connections',
        label: 'Connections',
        icon: 'solar:devices-linear'
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'solar:devices-linear',
        children: [
          {
            id: 'overview',
            label: 'Overview'
          },
          {
            id: 'sounds',
            label: 'Sounds'
          },
          {
            id: 'badges',
            label: 'Badges'
          },
          {
            id: 'email',
            label: 'Email'
          },
          {
            id: 'advanced',
            label: 'Advanced'
          }
        ]
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
        id: 'server-boost',
        label: 'Server Boost',
        icon: 'solar:card-linear'
      },
      {
        id: 'subscriptions',
        label: 'Subscriptions',
        icon: 'solar:card-linear'
      },
      {
        id: 'gift-inventory',
        label: 'Gift Inventory',
        icon: 'solar:card-linear'
      },
      {
        id: 'billing',
        label: 'Billing',
        icon: 'solar:wallet-linear',
        children: [
          {
            id: 'payment-methods',
            label: 'Payment Methods'
          },
          {
            id: 'transaction-history',
            label: 'Transaction History'
          }
        ]
      }
    ]
  },

  {
    title: 'APP SETTINGS',
    items: [
      {
        id: 'appearance',
        label: 'Appearance',
        icon: 'solar:palette-linear',
        children: [
          {
            id: 'theme',
            label: 'Theme'
          },
          {
            id: 'in-app-icon',
            label: 'In-app Icon'
          },
          {
            id: 'ui-density',
            label: 'UI Density'
          },
          {
            id: 'message-spacing',
            label: 'Message Spacing'
          },
          {
            id: 'scaling',
            label: 'Scaling'
          }
        ]
      },
      {
        id: 'accessibility',
        label: 'Accessibility',
        icon: 'solar:videocamera-linear',
        children: [
          {
            id: 'colors',
            label: 'Colors & Saturation'
          },
          {
            id: 'profile',
            label: 'Profile Colors'
          },
          {
            id: 'contrast',
            label: 'Contrast'
          },
          {
            id: 'reduced-motion',
            label: 'Reduced Motion'
          },
          {
            id: 'chat-input',
            label: 'Chat Input'
          },
          {
            id: 'text-to-speech',
            label: 'Text Speech'
          }
        ]
      },
      {
        id: 'voice-video',
        label: 'Voice & Video',
        icon: 'solar:videocamera-linear',
        children: [
          {
            id: 'camera',
            label: 'Camera'
          },
          {
            id: 'streaming',
            label: 'Streaming'
          },
          {
            id: 'sounds',
            label: 'Sounds'
          },
          {
            id: 'sound-board',
            label: 'Soundboard'
          },
          {
            id: 'advanced',
            label: 'Advanced'
          }
        ]
      },
      {
        id: 'chat',
        label: 'Chat',
        icon: 'solar:chat-round-dots-linear',
        children: [
          {
            id: 'media',
            label: 'Media'
          },
          {
            id: 'embeds',
            label: 'Embeds and Link Previews'
          },
          {
            id: 'emoji',
            label: 'Emoji'
          },
          {
            id: 'stickers',
            label: 'Stickers'
          },
          {
            id: 'text-box',
            label: 'Text box'
          },
          {
            id: 'threads',
            label: 'Threads'
          }
        ]
      },
      {
        id: 'keybinds',
        label: 'Keybinds',
        icon: 'solar:settings-linear'
      },
      {
        id: 'language-time',
        label: 'Language & Time',
        icon: 'solar:settings-linear'
      },
      {
        id: 'streamer-mode',
        label: 'Streamer Mode',
        icon: 'solar:settings-linear'
      },
      {
        id: 'advanced',
        label: '... Advanced',
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
