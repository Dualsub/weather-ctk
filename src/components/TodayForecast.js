/*
 * Component that displays the weather currently in the specified city. Also changes background color of its parent component, App.
 */

import React, { useState, useEffect } from 'react'
import { weatherMeta, getWeatherType } from '../WeatherTypes';
import { CircularProgress } from '@mui/material';
import InfoCard from './InfoCard';
import InfoTable from './InfoTable';

const TodayForecast = ({city, day, wind, setBackground }) => {

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

            // Set the background of the app.
            const weatherType = getWeatherType(data.weather)
            setBackground(weatherMeta[weatherType].bgColor)
            console.log(data.weather);
            console.log(weatherMeta[weatherType].bgColor, "backghrounsd");
            

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
  }, [city, setBackground])

  // Hear we clean the data for the ForecastCard component to use.
  console.log(weatherData);
  // forecastData.daily.map((rawDayData) => console.log(rawDayData.dt)) 

  let cleanedWeatherData = null

  try {
    const weatherType = getWeatherType(weatherData["weather"])
    
    cleanedWeatherData = {
      weatherType: weatherType
    }
  } catch (error) {
      setHasError(true)
      console.log(error);   
  }

  // if(isLoading)
  //     return <CircularProgress className="self-center"/>

  if(hasError)
      return <div>Lyckades inte hämta prognosen.</div>

    
  // Here we prepare all the data that is needed for the info table
  const tableData = {
    temp: Math.round(weatherData.main.temp), 
    minTemp: Math.round(weatherData.main.temp_min), 
    maxTemp: Math.round(weatherData.main.temp_max), 
    feelTemp: Math.round(weatherData.main.feels_like), 

    windSpeed: Math.round(weatherData.wind.speed), 
    windAngle: Math.round(weatherData.wind.deg),
    
    sunrise: new Date(weatherData.sys.sunrise * 1000),
    sunset: new Date(weatherData.sys.sunset * 1000),
    
    visibility: weatherData.visibility / 1000,

    weatherType: cleanedWeatherData.weatherType
  }

  return (
    <div className=' text-white w-full flex lg:flex-row flex-col items-center py-8 my-8'>
      <div className='flex flex-col justify-between w-full mb-8 lg:m-0'>
        <div className='m-2 flex flex-col items-center my-auto'>
          <h1 className='text-6xl font-medium my-2'>
            {city ? city.name : <div className='animate-pulse'>...</div>}
          </h1>
          <h3 className='text-2xl font-normal my-2'>
            {city && city.country}
          </h3>
          <h1 className='text-7xl font-medium my-4'>
            {(weatherData && weatherData.main && weatherData.main.temp) ? Math.round(weatherData.main.temp) : 0}&deg;
          </h1>          
        </div>
        <div className='m-2'>
        </div>
      </div>
      <InfoTable {...tableData}/>
    </div>
  )
}

export default TodayForecast