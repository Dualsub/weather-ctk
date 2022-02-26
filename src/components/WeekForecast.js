import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ForecastCard from './ForecastCard'
import { getWeatherType, weatherMeta } from '../WeatherTypes'
import DateRangeIcon from '@mui/icons-material/DateRange';

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

const WeekForecast = ({ city }) => {
    
    const [forecastData, setForecastData] = useState(null)
    // const [hasError, setHasError] = useState(false)
    let hasError = false
    const setHasError = (b) => { hasError = b };

    const [isLoading, setLoading] = useState(false)

    // Here we do the api call to the weather api.
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            
            try {
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=be70debc4ee8978171c5658f48c475d8` 
                console.log(url);
                const response = await fetch(url)
                const data = await response.json()
                setForecastData(data)    
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
    console.log(forecastData);
    // forecastData.daily.map((rawDayData) => console.log(rawDayData.dt)) 

    
    let cleanedForecastData = null

    try {
        cleanedForecastData = forecastData.daily.slice(1, NUM_FORECAST_DAYS+1).map((rawDayData) => {
            
            const dateObj = new Date(parseInt(rawDayData["dt"] * 1000))
            const temp = rawDayData["temp"]["day"]
            const windSpeed = rawDayData["wind_speed"]
            const windAngle = rawDayData["wind_deg"]
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
        setHasError(true)
        console.log(error);   
    }
  
    console.log(cleanedForecastData);

    if(hasError)
        return <div>Lyckades inte hämta prognosen.</div>

    return (
    <div className='flex flex-col items-center w-full rounded-lg bg-white shadow-lg p-6'>
        <h2 className='mb-6 mt-2 text-2xl font-medium text-gray-600'>
            <DateRangeIcon className='mx-4'/>
            {NUM_FORECAST_DAYS}-dagarsprognos
        </h2>
        <div className='flex flex-row overflow-x-scroll overflow-y-hidden lg:overflow-visible w-full justify-between'>
        {cleanedForecastData ? cleanedForecastData.map((dayData, index) => (
            <ForecastCard key={index} {...dayData} />
        )) : <CircularProgress className="self-center"/>}
        </div>
    </div>
  )
}

export default WeekForecast