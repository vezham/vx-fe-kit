import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'
import { DEFAULT_LOCATION, useLocation } from '../../../../hooks/use-location'
import { useWeather } from '../../../../hooks/use-weather'
import { getWeatherIcon } from '../../../../lib/weather-utils'

export default function WeatherSM01() {
  const { coordinates, city, isLoading: isLoadingLocation } = useLocation()
  const { data: weather, isLoading: isLoadingWeather } = useWeather(
    coordinates?.lat ?? DEFAULT_LOCATION.lat,
    coordinates?.lon ?? DEFAULT_LOCATION.lon
  )

  const isLoading = isLoadingLocation || isLoadingWeather

  if (isLoading) {
    return (
      <Widget>
        <WidgetContent className="flex items-center justify-center">
          <Label className="animate-pulse">Loading...</Label>
        </WidgetContent>
      </Widget>
    )
  }

  return (
    <Widget>
      <WidgetContent className="flex-col items-center justify-center gap-4">
        {weather &&
          getWeatherIcon(weather.weatherCode, 'size-16', { strokeWidth: 2 })}
        <Label className="text-4xl">{weather?.temperature}&deg;</Label>
      </WidgetContent>
      <WidgetFooter className="justify-center">
        <Label className="text-lg font-semibold">
          {city || 'Unknown Location'}
        </Label>
      </WidgetFooter>
    </Widget>
  )
}
