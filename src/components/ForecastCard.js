/*
 * Kort där det står väderprognos för en spcifierad dag.
 */

import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { getWeatherData, getWeatherType, weatherMeta } from '../WeatherTypes';
// import { weatherMeta } from '../WeatherTypes';


const ForecastCard = ({ day, date, temp, windSpeed, windAngle, weatherType }) => {

    const weather = getWeatherData(weatherType) 

    const rot = {
        transform: `rotate(${windAngle}deg)`
    };

    return (
    <div className={weather.bgColor + 'flex flex-row justify-between rounded-lg shadow-lg lg:w-48 lg:h-48 p-3 m-2 text-white transform transition-all duration-150 ease-out hover:scale-105 scale-100'}>
        <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
                <div className='ml-2'>
                    <h2 className='text-4xl'>{Math.round(temp)}&deg;</h2>
                </div>
                    <div className='ml-2'>
                        <p>{weather.description}</p>
                        <p>
                            Vind: 
                            <ArrowRightAltIcon style={rot}/>
                            {Math.round(windSpeed)} m/s
                        </p>
                    </div>
            </div>
            <div className='mt-2 mr-2'>
                {weather.icon}
            </div>
        </div>
            <div className='mt-auto mb-2 ml-2 lg:self-start self-end'>
                <p className='text-xl'>{day}</p>
                <p className='text-xl'>{date}</p>
            </div>
        </div>
    </div>
  )
}

export default ForecastCard