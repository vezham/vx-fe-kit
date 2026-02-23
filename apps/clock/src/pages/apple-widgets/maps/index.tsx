import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Map, ZoomControl } from 'pigeon-maps'
import React from 'react'

import { Button, ScrollShadow } from '@vezham/react/v2'

import { AppView } from '../../../components/app-view'
import { defaultCenter, recentLocations } from './data'
import type { Location, MapsAppProps } from './types'

export function MapsApp({ isOpen, onClose }: MapsAppProps) {
  const [selectedLocation, setSelectedLocation] =
    React.useState<Location | null>(null)

  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Maps">
      <div className="flex h-full flex-col">
        {/* Map Section */}
        <div className="relative h-1/2">
          <Map defaultCenter={defaultCenter} defaultZoom={13} animate>
            <ZoomControl />
          </Map>

          <div className="absolute right-2 bottom-2">
            <Button
              isIconOnly
              size="sm"
              className="bg-white/10 backdrop-blur-md">
              <Icon icon="lucide:navigation-2" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <ScrollShadow className="flex-1">
          <div className="space-y-4 p-4">
            {/* Search */}
            <div className="relative">
              <Icon
                icon="lucide:search"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search location..."
                className="focus:ring-primary-500 w-full rounded-lg bg-white/5 py-2 pr-4 pl-10 text-sm text-white focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Recent Places */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">
                Recent Places
              </h4>

              {recentLocations.map((location, index) => {
                const color =
                  location.type === 'home'
                    ? 'success'
                    : location.type === 'work'
                      ? 'primary'
                      : 'warning'

                const icon =
                  location.type === 'home'
                    ? 'lucide:home'
                    : location.type === 'work'
                      ? 'lucide:briefcase'
                      : 'lucide:dumbbell'

                return (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedLocation(location)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                    <div className={`rounded-full p-2 bg-${color}-500/20`}>
                      <Icon
                        icon={icon}
                        className={`h-4 w-4 text-${color}-500`}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {location.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {location.address}
                      </p>
                    </div>

                    <Icon
                      icon="lucide:chevron-right"
                      className="h-4 w-4 text-gray-400"
                    />
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                <Icon
                  icon="lucide:navigation"
                  className="text-primary-500 h-5 w-5"
                />
                <span className="text-sm text-white">Start Navigation</span>
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                <Icon
                  icon="lucide:bookmark"
                  className="text-primary-500 h-5 w-5"
                />
                <span className="text-sm text-white">Save Location</span>
              </button>
            </div>
          </div>
        </ScrollShadow>
      </div>
    </AppView>
  )
}
