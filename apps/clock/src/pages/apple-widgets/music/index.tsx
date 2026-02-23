import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

import { Button, ScrollShadow } from '@vezham/react/v2'

import { AppView } from '../../../components/app-view'
import { songs } from './data'
import type { MusicAppProps, Song } from './types'

export function MusicApp({ isOpen, onClose }: MusicAppProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentSong, setCurrentSong] = React.useState<Song>(songs[0])

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Music">
      <ScrollShadow className="h-full">
        <div className="flex flex-col gap-4 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3">
            <motion.img
              src={currentSong.cover}
              alt={currentSong.title}
              className="h-32 w-32 rounded-xl shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />

            <div className="text-center">
              <h3 className="font-semibold text-white">{currentSong.title}</h3>
              <p className="text-sm text-gray-400">{currentSong.artist}</p>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <Button
                isIconOnly
                variant="light"
                className="text-white"
                size="sm">
                <Icon icon="lucide:skip-back" className="h-5 w-5" />
              </Button>

              <Button
                isIconOnly
                className="bg-primary-500 hover:bg-primary-600 text-white"
                size="lg"
                onClick={togglePlay}>
                <Icon
                  icon={isPlaying ? 'lucide:pause' : 'lucide:play'}
                  className="h-6 w-6"
                />
              </Button>

              <Button
                isIconOnly
                variant="light"
                className="text-white"
                size="sm">
                <Icon icon="lucide:skip-forward" className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Up Next</h4>

            <div className="flex flex-col gap-2">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentSong(song)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 ${
                    currentSong.id === song.id
                      ? 'bg-white/10'
                      : 'hover:bg-white/5'
                  }`}>
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="h-10 w-10 rounded-md"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-white">{song.title}</p>
                    <p className="truncate text-xs text-gray-400">
                      {song.artist}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">{song.duration}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollShadow>
    </AppView>
  )
}
