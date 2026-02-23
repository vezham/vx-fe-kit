export type LocationType = 'home' | 'work' | 'gym'

export interface Location {
  name: string
  address: string
  type: LocationType
  coordinates: [number, number]
}

export interface MapsAppProps {
  isOpen: boolean
  onClose: () => void
}
