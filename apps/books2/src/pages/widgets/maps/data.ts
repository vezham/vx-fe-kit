import type { Location } from './types'

export const defaultCenter: [number, number] = [51.505, -0.09]

export const recentLocations: Location[] = [
  {
    name: 'Home',
    address: '123 Main Street',
    type: 'home',
    coordinates: [51.505, -0.09]
  },
  {
    name: 'Work',
    address: '456 Office Plaza',
    type: 'work',
    coordinates: [51.51, -0.1]
  },
  {
    name: 'Gym',
    address: '789 Fitness Center',
    type: 'gym',
    coordinates: [51.515, -0.095]
  }
]
