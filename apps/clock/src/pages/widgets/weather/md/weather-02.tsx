import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader
} from '../../../../components/ui/widget'
import { DEFAULT_LOCATION, useLocation } from '../../../../hooks/use-location'
import { useWeather } from '../../../../hooks/use-weather'
import {
  getSmallWeatherIcon,
  getWeatherIcon
} from '../../../../lib/weather-utils'

export default function WeatherMD02() {
  const { coordinates, city, isLoading: isLoadingLocation } = useLocation()
  const { data: weather, isLoading: isLoadingWeather } = useWeather(
    coordinates?.lat ?? DEFAULT_LOCATION.lat,
    coordinates?.lon ?? DEFAULT_LOCATION.lon
  )

  const isLoading = isLoadingLocation || isLoadingWeather

  // Get next 6 hours including current or starting from now
  const next6Hours =
    weather?.hourly.time.slice(0, 6).map((time, index) => {
      const date = new Date(time)
      const hour = date.getHours()
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12

      return {
        time: `${hour12} ${ampm}`,
        temp: weather.hourly.temperature[index],
        weatherCode: weather.hourly.weatherCode[index]
      }
    }) || []

  if (isLoading) {
    return (
      <Widget size="md">
        <WidgetContent>
          <div className="flex w-full items-center justify-center">
            <Label className="animate-pulse">Loading weather data...</Label>
          </div>
        </WidgetContent>
      </Widget>
    )
  }

  return (
    <Widget size="md">
      <WidgetHeader className="items-start">
        <div className="flex flex-col items-start">
          <Label>{city || 'Unknown Location'}</Label>
          <Label className="text-4xl">{weather?.temperature}&deg;</Label>
        </div>
        <div className="flex flex-col items-start">
          {weather && getWeatherIcon(weather.weatherCode)}
        </div>
      </WidgetHeader>
      <WidgetContent className="mt-4 grid w-full grid-cols-6 items-end gap-6">
        {next6Hours.map((el, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <Label className="text-muted text-xs">{el.time}</Label>
            <Label className="text-muted">
              {getSmallWeatherIcon(el.weatherCode)}
            </Label>
            <Label className="text-lg">{el.temp}&deg;</Label>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
