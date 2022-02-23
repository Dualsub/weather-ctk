/*
 * Kort där det står väderprognos för en spcifierad dag.
 */

import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import { weatherMeta } from '../WeatherTypes';
import BoltIcon from '@mui/icons-material/Bolt';

const weatherMeta = {
    1: {
        description: "Oskväder",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
            )
        },
    2: {
        description: "Duggregn",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
        )
    },
    3 : {
        description: "Regn",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
        )
    },
    4: {
        description: "Snö",
        bgColor: "bg-gradient-to-t from-blue-600  via-to-gray-300 to-gray-200",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
        )
    },
    5: {
        description: "Molningt",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
        )
    },
    6: {
        description: "Molningt",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
        )
    },
    7: {
        description: "Klart",
        primaryColor: "green-400",
        secondaryColor: "gray-800",
        icon: (
            <BoltIcon />
        )
    }
}

const ForecastCard = ({ day, date, temp, windSpeed, windAngle, weatherType }) => {

    const rot = {
        transform: `rotate(${windAngle}deg)`
    };

    const weatherData = weatherMeta[4]
    return (
    <div className={weatherData.bgColor + ' flex flex-col justify-between rounded-lg shadow-lg w-48 h-48 p-3 m-2 text-white transform transition-all duration-150 ease-out hover:scale-105 scale-100'}>
        <div className='ml-2'>
        <h2 className='text-4xl'>{Math.round(temp)}&deg;</h2>
        </div>
        <p className='ml-2'>
            Vind: 
            <ArrowRightAltIcon style={rot}/>
            {Math.round(windSpeed)} m/s
        </p>
        <div className='mt-auto mb-2 ml-2'>
            <p className='text-xl'>{day}</p>
            <p className='text-xl'>{date}</p>
        </div>
    </div>
  )
}

export default ForecastCard