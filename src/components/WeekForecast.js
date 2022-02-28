/*
 * List of Forecast cards for the next 5 days. 
 */


import React, { useState } from 'react'
import { CircularProgress } from '@mui/material'
import ForecastCard from './ForecastCard'
import { getWeatherType } from '../WeatherTypes'
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Error } from '@mui/icons-material';

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

const numForecastDays = 5

const WeekForecast = ({ forecastData, isLoading }) => {
    
    // Here we clean the data for the ForecastCard component to use.    
    let cleanedForecastData = null

    try {
        cleanedForecastData = forecastData ? forecastData.slice(1, numForecastDays+1).map((rawDayData) => {
            
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
        }) : null
          
    } catch (error) {
        console.log(error);
        return (
            <div className='flex flex-col items-center justify-center w-full rounded-lg bg-white shadow-lg p-6 mb-6 mt-2 text-2xl font-medium text-gray-600'>
                    <div className='h-40 flex flex-col items-center justify-center'>
                        <Error style={{fontSize: "48px"}} className="m-2"/>
                        <p>Något gick fel.</p>
                    </div>
            </div>
          )
    }

    return (
    <div className='flex flex-col items-center w-full rounded-lg bg-white shadow-lg p-6'>
        <h2 className='mb-6 mt-2 text-2xl font-medium text-gray-600'>
            <DateRangeIcon className='mx-4'/>
            {numForecastDays}-dagarsprognos
        </h2>
        <div className='flex lg:flex-row flex-col overflow-x-scroll overflow-y-hidden lg:overflow-visible w-full justify-between'>
        {(cleanedForecastData && !isLoading) ? cleanedForecastData.map((dayData, index) => (
            <ForecastCard key={index} {...dayData} />
        )) : (<CircularProgress className="self-center"/>)
        // ({cleanedForecastData ? (<CircularProgress className="self-center"/>) : (<CircularProgress className="self-center"/>)})
        }
        </div>
    </div>
  )
}

export default WeekForecast