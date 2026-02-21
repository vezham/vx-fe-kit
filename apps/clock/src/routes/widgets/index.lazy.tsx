import { createLazyFileRoute } from '@tanstack/react-router'

import Calendar from '../../pages/widgets/calendar'
import Clock from '../../pages/widgets/clock'
import Dashboard from '../../pages/widgets/dashboard'
import Media from '../../pages/widgets/media'
import Productivity from '../../pages/widgets/productivity'
import Sports from '../../pages/widgets/sports'
import Stocks from '../../pages/widgets/stocks'
import Weather from '../../pages/widgets/weather'
import WeatherDemoMD from '../../pages/widgets/weather/md/weather-01'
import WeatherDemoSM from '../../pages/widgets/weather/sm/weather-01'

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
    </div>
  )
}
