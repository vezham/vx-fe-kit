import { SettingGroup } from './types'

export const settingsGroups: SettingGroup[] = [
  {
    title: 'Connectivity',
    items: [
      { icon: 'lucide:wifi', label: 'Wi-Fi', type: 'toggle', value: true },
      {
        icon: 'lucide:bluetooth',
        label: 'Bluetooth',
        type: 'toggle',
        value: true
      },
      { icon: 'lucide:phone', label: 'Cellular', type: 'toggle', value: false }
    ]
  },
  {
    title: 'General',
    items: [
      { icon: 'lucide:bell', label: 'Notifications', type: 'menu' },
      { icon: 'lucide:volume-2', label: 'Sounds & Haptics', type: 'menu' },
      { icon: 'lucide:eye', label: 'Display & Brightness', type: 'menu' }
    ]
  },
  {
    title: 'Features',
    items: [
      {
        icon: 'lucide:heart-pulse',
        label: 'Heart Rate',
        type: 'toggle',
        value: true
      },
      {
        icon: 'lucide:activity',
        label: 'Activity Tracking',
        type: 'toggle',
        value: true
      },
      { icon: 'lucide:moon', label: 'Sleep Mode', type: 'toggle', value: false }
    ]
  }
]
