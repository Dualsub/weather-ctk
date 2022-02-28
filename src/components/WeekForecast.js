import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ForecastCard from './ForecastCard'
import { getWeatherType } from '../WeatherTypes'
import DateRangeIcon from '@mui/icons-material/DateRange';
import Error  from '@mui/icons-material/Error';

const DAYS = [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag'
]

const MONTHS = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December'
]

const NUM_FORECAST_DAYS = 5

const WeekForecast = ({ forecastData }) => {
    
    const [hasError, setHasError] = useState(false)
    const [isLoading, setLoading] = useState(false)

    // Here we clean the data for the ForecastCard component to use.    
    let cleanedForecastData = null

    try {
        cleanedForecastData = forecastData.slice(1, NUM_FORECAST_DAYS+1).map((rawDayData) => {
            
            const dateObj = new Date(parseInt(rawDayData["dt"] * 1000))
            const temp = rawDayData.temp.day
            const windSpeed = rawDayData.wind_speed
            const windAngle = rawDayData.wind_deg
            const weatherID = getWeatherType(rawDayData["weather"]);

            return {
                day: DAYS[dateObj.getDay()],
                date: `${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}`,
                temp: temp,
                windSpeed: windSpeed,
                windAngle: windAngle,
                weatherType: weatherID
            }
        })
          
    } catch (error) {
        // setHasError(true)
    }

    return (
    <div className='flex flex-col items-center w-full rounded-lg bg-white shadow-lg p-6'>
        <h2 className='mb-6 mt-2 text-2xl font-medium text-gray-600'>
            <DateRangeIcon className='mx-4'/>
            {NUM_FORECAST_DAYS}-dagarsprognos
        </h2>
        <div className='flex lg:flex-row flex-col overflow-x-scroll overflow-y-hidden lg:overflow-visible w-full justify-between'>
        {cleanedForecastData ? cleanedForecastData.map((dayData, index) => (
            <ForecastCard key={index} {...dayData} />
        )) : <CircularProgress className="self-center"/>}
        </div>
    </div>
  )
}

export default WeekForecast