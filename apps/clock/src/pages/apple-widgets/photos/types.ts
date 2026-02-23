export interface Photo {
  id: number
  url: string
  thumbnail: string
  date: string
}

export interface PhotosAppProps {
  isOpen: boolean
  onClose: () => void
}
