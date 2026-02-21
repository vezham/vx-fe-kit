import WeatherMD01 from './md/weather-01'
import WeatherMD02 from './md/weather-02'
import WeatherSM01 from './sm/weather-01'
import WeatherSM02 from './sm/weather-02'
import WeatherSM03 from './sm/weather-03'
import WeatherSM04 from './sm/weather-04'
import WeatherSM05 from './sm/weather-05'
import WeatherSM06 from './sm/weather-06'
import WeatherSM07 from './sm/weather-07'
import WeatherSM08 from './sm/weather-08'
import WeatherSM09 from './sm/weather-09'

const Weather = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Weather</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>

      <div className="grid grid-cols-3 gap-5">
        <WeatherSM01 />
        <WeatherSM02 />
        <WeatherSM03 />
        <WeatherSM04 />

        <WeatherSM05 />
        <WeatherSM06 />
        <WeatherSM07 />
        <WeatherSM08 />
        <WeatherSM09 />
      </div>
      <h2 className="text-lg font-bold">md</h2>
      <br></br>

      <div className="grid grid-cols-2 gap-5">
        <WeatherMD01 />
        <WeatherMD02 />
      </div>
    </div>
  )
}

export default Weather
