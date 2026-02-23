import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { Image, ScrollShadow } from '@vezham/react/v2'

import { AppView } from '../../../components/app-view'
import { groupedPhotos, photos } from './data'
import type { PhotosAppProps } from './types'

export function PhotosApp({ isOpen, onClose }: PhotosAppProps) {
  const [selectedPhoto, setSelectedPhoto] = React.useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const handlePhotoClick = (id: number) => {
    setImageLoaded(false)
    setSelectedPhoto(id)
  }

  const handleBack = () => {
    if (selectedPhoto) {
      setSelectedPhoto(null)
    } else {
      onClose()
    }
  }

  return (
    <AppView
      isOpen={isOpen}
      onClose={handleBack}
      title={selectedPhoto ? 'Photo' : 'Photos'}>
      <ScrollShadow className="h-full">
        <AnimatePresence mode="wait">
          {!selectedPhoto ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-2">
              {Object.entries(groupedPhotos).map(([date, datePhotos]) => (
                <div key={date} className="mb-4">
                  <h3 className="mb-2 px-2 text-sm text-gray-400">{date}</h3>

                  <div className="grid grid-cols-2 gap-2">
                    {datePhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: index * 0.1 }
                        }}
                        whileHover={{ scale: 0.95 }}
                        layoutId={`photo-${photo.id}`}
                        onClick={() => handlePhotoClick(photo.id)}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-800/50">
                        <Image
                          src={photo.thumbnail}
                          alt={`Photo ${photo.id}`}
                          classNames={{
                            wrapper: 'w-full h-full',
                            img: 'object-cover w-full h-full'
                          }}
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="relative flex h-full items-center justify-center bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                layoutId={`photo-${selectedPhoto}`}
                className="relative flex h-full w-full items-center justify-center p-2">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      icon="lucide:image"
                      className="h-8 w-8 animate-pulse text-gray-500"
                    />
                  </div>
                )}

                <Image
                  src={photos.find(p => p.id === selectedPhoto)?.url}
                  alt={`Photo ${selectedPhoto}`}
                  onLoad={() => setImageLoaded(true)}
                  classNames={{
                    wrapper: 'w-full h-full flex items-center justify-center',
                    img: `object-contain w-full h-full transition-opacity duration-300 rounded-lg ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="text-white hover:text-red-500">
                        <Icon icon="lucide:heart" className="h-6 w-6" />
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="text-white hover:text-blue-500">
                        <Icon icon="lucide:share" className="h-6 w-6" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="text-white hover:text-red-500">
                      <Icon icon="lucide:trash-2" className="h-6 w-6" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollShadow>
    </AppView>
  )
}
