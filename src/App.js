/*
 * The main component in the componentn tree. Keeps track of the current city that is begin displayed.
 */

import { useEffect, useState } from "react";
import WeekForecast from "./components/WeekForecast";
import TodayForecast from "./components/TodayForecast";
import CitySelector from "./components/CitySelector";
import { cities } from "./cities";
import Footer from "./components/Footer";
import { getWeatherType, getWeatherData } from "./WeatherTypes";

function App() {
  // The city that the weather is shown for.
  const [city, setCity] = useState(cities[0])
  const [background, setBackground] = useState(getWeatherData(7).bgColor)  
  const [rawData, setRawData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  // Here we do the api call to the weather api.
  useEffect(() => {
      const fetchData = async () => {
          setLoading(true)
          
          const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&lang=sv&units=metric&exclude=minutely,alerts&appid=` + process.env.REACT_APP_API_KEY 
          const response = await fetch(url)
          const data = await response.json()
          setRawData(data)
          
          const weatherType = getWeatherType(data.current.weather)
          const weatherMeta = getWeatherData(weatherType)

          setBackground(weatherMeta.bgColor)

          setLoading(false)
      }

      fetchData()
      .catch((error) => {
          // If there is an error the data will be null and the components will render defaults or errors if the data is null.
          setLoading(false)
          console.log(error);
      });
  }, [city])

  return (
    <div className={background + " min-w-full min-h-screen transition-all duration-150 ease-out"}>
      <div className="flex flex-col items-center h-full w-full max-w-6xl lg:mx-auto px-6">
        <div className="flex flex-col items-center w-full mt-4">
          <CitySelector city={city} setCity={setCity} />
          <TodayForecast isLoading={isLoading} city={city ? city : null} weatherData={rawData ? rawData.current : null}/>
          <WeekForecast isLoading={isLoading} forecastData={rawData ? rawData.daily : null}/>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
