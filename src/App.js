/*
 * The main component in the componentn tree. Keeps track of the current city that is begin displayed.
 */

import { useEffect, useState } from "react";
import WeekForecast from "./components/WeekForecast";
import TodayForecast from "./components/TodayForecast";
import CitySelector from "./components/CitySelector";
import { CircularProgress } from "@mui/material";
import { cities } from "./cities";
import { getWeatherType } from "./WeatherTypes";

function App() {

  // The city that the weather is shown for.
  const [city, setCity] = useState(cities[0])
  const [weatherData, setWeatherData] = useState(null)
  // const [hasError, setHasError] = useState(false)
  let hasError = false
  const setHasError = (b) => { hasError = b };
  const [isLoading, setLoading] = useState(false)

  // Here we do the api call to the weather api.
  useEffect(() => {
      const fetchData = async () => {
          setLoading(true)
          
          try {
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=be70debc4ee8978171c5658f48c475d8` 
              console.log(url);
              const response = await fetch(url)
              const data = await response.json()
              setWeatherData(data)    
          } catch (error) {
              setHasError(true)
              console.log(error);
          }
              
          setLoading(false)
      }

      fetchData()
      .catch((error) => {
          setHasError(true)
          console.log(error);    
      });
  }, [city])

  // Hear we clean the data for the ForecastCard component to use.
  console.log(weatherData);
  // forecastData.daily.map((rawDayData) => console.log(rawDayData.dt)) 

  let cleanedWeatherData = null

  try {
    const weatherID = getWeatherType(weatherData["weather"])
    
    cleanedWeatherData = {
      weatherType: weatherID
    }
  } catch (error) {
      setHasError(true)
      console.log(error);   
  }

  console.log(cleanedWeatherData);

  if(isLoading)
      return <CircularProgress className="self-center"/>

  if(hasError)
      return <div>Lyckades inte hämta prognosen.</div>

  return (
    <div className=" bg-gradient-to-t from-blue-600 via-to-cyan-600  to-cyan-500 min-w-full min-h-screen">
      <div className="flex flex-col items-center h-full w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center w-full mt-4">
          <CitySelector city={city} setCity={setCity} />
          <TodayForecast city={city}/>
          <WeekForecast city={city}/>
        </div>
      </div>
    </div>
  );
}

export default App;
