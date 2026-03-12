import { Photo } from './types'

export const photos: Photo[] = [
  {
    id: 1,
    url: 'https://picsum.photos/400/400?id=1',
    thumbnail: 'https://picsum.photos/150/150?id=1',
    date: 'Today'
  },
  {
    id: 2,
    url: 'https://picsum.photos/400/400?id=2',
    thumbnail: 'https://picsum.photos/150/150?id=2',
    date: 'Today'
  },
  {
    id: 3,
    url: 'https://picsum.photos/400/400?id=3',
    thumbnail: 'https://picsum.photos/150/150?id=3',
    date: 'Yesterday'
  },
  {
    id: 4,
    url: 'https://picsum.photos/400/400?id=4',
    thumbnail: 'https://picsum.photos/150/150?id=4',
    date: 'Yesterday'
  },
  {
    id: 5,
    url: 'https://picsum.photos/400/400?id=5',
    thumbnail: 'https://picsum.photos/150/150?id=5',
    date: 'Last Week'
  },
  {
    id: 6,
    url: 'https://picsum.photos/400/400?id=6',
    thumbnail: 'https://picsum.photos/150/150?id=6',
    date: 'Last Week'
  },
  {
    id: 7,
    url: 'https://picsum.photos/400/400?id=7',
    thumbnail: 'https://picsum.photos/150/150?id=7',
    date: 'Last Week'
  },
  {
    id: 8,
    url: 'https://picsum.photos/400/400?id=8',
    thumbnail: 'https://picsum.photos/150/150?id=8',
    date: 'Last Month'
  }
]

export const groupedPhotos = photos.reduce(
  (acc, photo) => {
    if (!acc[photo.date]) {
      acc[photo.date] = []
    }
    acc[photo.date].push(photo)
    return acc
  },
  {} as Record<string, Photo[]>
)
