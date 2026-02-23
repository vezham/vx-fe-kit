export interface Song {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
}

export interface MusicAppProps {
  isOpen?: boolean
  onClose?: () => void
}
