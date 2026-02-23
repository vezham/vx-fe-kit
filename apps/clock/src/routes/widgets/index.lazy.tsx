import { createLazyFileRoute } from '@tanstack/react-router'

import Calendar from '../../pages/widgets/calendar'
import CalendarAppWidget from '../../pages/widgets/calendar/calendar'
import Clock from '../../pages/widgets/clock'
import Dashboard from '../../pages/widgets/dashboard'
import Health from '../../pages/widgets/health'
import Mail from '../../pages/widgets/mail'
import Maps from '../../pages/widgets/maps'
import Media from '../../pages/widgets/media'
import Messages from '../../pages/widgets/messages'
import Music from '../../pages/widgets/music'
import Phone from '../../pages/widgets/phone'
import Photos from '../../pages/widgets/photos'
import Productivity from '../../pages/widgets/productivity'
import Settings from '../../pages/widgets/settings'
import Sports from '../../pages/widgets/sports'
import Stocks from '../../pages/widgets/stocks'
import Weather from '../../pages/widgets/weather'

export const Route = createLazyFileRoute('/widgets/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="grid justify-center gap-5">
      <div className="mt-6">
        <Calendar />
      </div>
      <div className="mt-6">
        <Clock />
      </div>
      <div className="mt-6">
        <Dashboard />
      </div>
      <div className="mt-6">
        <Media />
      </div>
      <div className="mt-6">
        <Sports />
      </div>
      <div className="mt-6">
        <Stocks />
      </div>
      <div className="mt-6">
        <Productivity />
      </div>
      <div className="mt-6">
        <Weather />
      </div>
      <div>
        <h1 className="my-6 text-center text-2xl font-semibold">Apps</h1>
        <div className="grid grid-cols-3 gap-6">
          <Phone />
          <Messages />
          <Mail />
          <CalendarAppWidget />
          <Music />
          <Health />
          <Settings />
          <Photos />
          <Maps />
        </div>
      </div>
    </div>
  )
}
