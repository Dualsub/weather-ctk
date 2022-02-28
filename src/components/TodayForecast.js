/*
 * Component that displays the weather currently in the specified city.
 */

import React, { useState } from 'react'
import { getWeatherDesc, getWeatherType } from '../WeatherTypes';
import InfoTable from './InfoTable';
import Error from '@mui/icons-material/Error';

const tableDefaults = {
  temp: 0, 
  minTemp: 0, 
  maxTemp: 0, 
  feelTemp: 0,
  windSpeed: 0, 
  windAngle: 0,
  sunrise: new Date(),
  sunset: new Date(),
  visibility: 0,
  weatherDesc: "",
  weatherType: 7,
  humidity: 0
}

const TodayForecast = ({city, weatherData, isLoading }) => {

  if(!weatherData && !isLoading)
  {
    
    return (
      <div className='text-white w-full flex flex-col items-center justify-center my-8 h-96'>
        <Error style={{fontSize:"60px"}}/>
        <h1 className='text-2xl font-normal my-2'>
        Det gick inte att hämta väder data.
        </h1>
    </div>
    )
  }
  

  const temp = weatherData ? Math.round(weatherData.temp) : 0
  const weatherType = weatherData ? getWeatherType(weatherData.weather) : 7
  
  // Here we prepare all the data that is needed for the info table
  const tableData = weatherData ? {
    temp: temp, 
    minTemp: 0, 
    maxTemp: 0, 
    feelTemp: Math.round(weatherData.feels_like), 

    windSpeed: Math.round(weatherData.wind_speed), 
    windAngle: Math.round(weatherData.wind_deg),
    
    sunrise: new Date(weatherData.sunrise * 1000),
    sunset: new Date(weatherData.sunset * 1000),
    
    visibility: weatherData.visibility,
    
    weatherDesc: getWeatherDesc(weatherData.weather),
    weatherType: weatherType,

    humidity: weatherData.humidity,
    dewPoint: Math.round(weatherData.dew_point) 
  } : tableDefaults

  return (
    <div className=' text-white w-full flex lg:flex-row flex-col items-center py-8 my-8 lg:justify-between'>
      <div className='flex flex-col justify-between mb-8 lg:m-0 w-1/2'>
        <div className='m-2 flex flex-col items-center my-auto'>
          <h1 className='text-6xl font-medium my-2'>
            {city && !isLoading ? city.name : <div className='animate-pulse'>...</div>}
          </h1>
          <h3 className='text-2xl font-normal my-2'>
            {city && !isLoading ? city.country : ""}
          </h3>
          <h1 className='text-7xl font-medium my-4'>
            {temp && !isLoading ? temp : 0}&deg;
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