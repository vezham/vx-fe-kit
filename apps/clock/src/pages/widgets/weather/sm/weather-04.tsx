import { Label } from '@vezham/react/v3'

import { Widget, WidgetContent } from '../../../../components/ui/widget'
import { DEFAULT_LOCATION, useLocation } from '../../../../hooks/use-location'
import { useWeather } from '../../../../hooks/use-weather'
import { getWeatherDescription } from '../../../../lib/weather-utils'

export default function WeatherSM04() {
  const { coordinates, isLoading: isLoadingLocation } = useLocation()
  const { data: weather, isLoading: isLoadingWeather } = useWeather(
    coordinates?.lat ?? DEFAULT_LOCATION.lat,
    coordinates?.lon ?? DEFAULT_LOCATION.lon
  )

  const isLoading = isLoadingLocation || isLoadingWeather

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  if (isLoading) {
    return (
      <Widget>
        <WidgetContent className="mx-auto flex-col items-center justify-center">
          <Label className="animate-pulse">Loading...</Label>
        </WidgetContent>
      </Widget>
    )
  }

  return (
    <Widget>
      <WidgetContent className="mx-auto flex-col items-center justify-center">
        <Label className="text-6xl">{weather?.temperature}&deg;</Label>
        <Label className="text-2xl">
          {weather ? getWeatherDescription(weather.weatherCode) : 'Sunny'}
        </Label>
        <Label className="items-start justify-start text-start">
          {currentDate}
        </Label>
      </WidgetContent>
    </Widget>
  )
}
