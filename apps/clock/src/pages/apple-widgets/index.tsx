import { div } from 'framer-motion/client'
import React from 'react'

import { Card, CardBody } from '@vezham/react/v2'

import { MenuItem } from '../../components/menu/menu-item'
import { StatusBar } from '../../components/status-bar'
import { Widget, WidgetContent } from '../../components/ui/widget'
import { CalendarApp } from './calendar'
import { HealthApp } from './health'
import { MailApp } from './mail'
import { MapsApp } from './maps'
import { MessagesApp } from './messages'
import { MusicApp } from './music'
import { PhoneApp } from './phone'
import { PhotosApp } from './photos'
import { SettingsApp } from './settings'

const menuItems = [
  {
    icon: 'lucide:phone',
    label: 'Phone',
    color: 'bg-green-500/90',
    delay: 0,
    app: 'phone'
  },
  {
    icon: 'lucide:message-circle',
    label: 'Messages',
    color: 'bg-blue-500/90',
    delay: 1,
    app: 'messages'
  },
  {
    icon: 'lucide:mail',
    label: 'Mail',
    color: 'bg-yellow-500/90',
    delay: 2,
    app: 'mail'
  },
  {
    icon: 'lucide:calendar',
    label: 'Calendar',
    color: 'bg-red-500/90',
    delay: 3,
    app: 'calendar'
  },
  {
    icon: 'lucide:music',
    label: 'Music',
    color: 'bg-purple-500/90',
    delay: 4,
    app: 'music'
  },
  {
    icon: 'lucide:heart',
    label: 'Health',
    color: 'bg-pink-500/90',
    delay: 5,
    app: 'health'
  },
  {
    icon: 'lucide:settings',
    label: 'Settings',
    color: 'bg-gray-500/90',
    delay: 6,
    app: 'settings'
  },
  {
    icon: 'lucide:image',
    label: 'Photos',
    color: 'bg-indigo-500/90',
    delay: 7,
    app: 'photos'
  },
  {
    icon: 'lucide:map',
    label: 'Maps',
    color: 'bg-orange-500/90',
    delay: 8,
    app: 'maps'
  }
]

const AppleWidgetPage = () => {
  const [openApp, setOpenApp] = React.useState<string | null>(null)

  const handleOpenApp = (app: string) => {
    setOpenApp(app)
  }

  const handleCloseApp = () => {
    setOpenApp(null)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <div className="flex items-center justify-center p-0">
              <div className="my-6 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-3">
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      color={item.color}
                      delay={index}
                      onClick={() => item.app && handleOpenApp(item.app)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <PhoneApp isOpen={openApp === 'phone'} onClose={handleCloseApp} />
            <MessagesApp
              isOpen={openApp === 'messages'}
              onClose={handleCloseApp}
            />
            <SettingsApp
              isOpen={openApp === 'settings'}
              onClose={handleCloseApp}
            />
            <MailApp isOpen={openApp === 'mail'} onClose={handleCloseApp} />
            <PhotosApp isOpen={openApp === 'photos'} onClose={handleCloseApp} />
            <MusicApp isOpen={openApp === 'music'} onClose={handleCloseApp} />
            <HealthApp isOpen={openApp === 'health'} onClose={handleCloseApp} />
            <CalendarApp
              isOpen={openApp === 'calendar'}
              onClose={handleCloseApp}
            />
            <MapsApp isOpen={openApp === 'maps'} onClose={handleCloseApp} />
          </div>
        </WidgetContent>
      </Widget>
    </div>
  )
}

export default AppleWidgetPage
