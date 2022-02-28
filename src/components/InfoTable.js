/*
 * Table of info cards with information about the current weather. 
 */

import React from 'react'
import InfoCard from './InfoCard'
import { getWeatherData } from '../WeatherTypes';

// Icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudIcon from '@mui/icons-material/Cloud';
import { Water } from '@mui/icons-material';


const formatTime = (date) => {
    return `${date.getHours() < 10 ? "0"+ date.getHours().toString() : date.getHours().toString()}:`
    + `${date.getMinutes() < 10 ? "0"+ date.getMinutes().toString() : date.getMinutes().toString()}`
}

// Inspired by https://stackoverflow.com/a/54677081.
const getDirection = (angle) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(angle / 45) % 8]
}

const InfoTable = ({ windSpeed, windAngle, sunrise, sunset, minTemp, maxTemp, feelTemp, visibility, weatherType, weatherDesc, humidity, dewPoint}) => {

    const rot = {
        transform: `rotate(${windAngle ? windAngle-90 : -90}deg)`,
        fontSize: "50px"
    };

    const weather = getWeatherData(weatherType)
    const now = new Date()

    // Here we calculate is the sun is up or not, and also the time until it switches.
    const isDay = sunrise < now && sunset > now
    const timeUntilSunChange = formatTime(isDay ? new Date(sunset.getTime() - now.getTime() - 3600000) : new Date(sunrise.getTime() - now.getTime() - 3600000))

    // We would preferably have the info cards as separate components, but this will do for now.
    return (
    <div className='grid md:grid-cols-3 grid-cols-2 lg:w-fit'>
        <InfoCard 
        title={(
        <div>
            <CloudIcon />
            Väder
        </div>
        )}
        content={(
            <div className='flex flex-col items-center h-full p-2'>
                <div className='text-center my-auto'>
                    {weather.icon}
                </div>
                <div className='mt-auto mb-2 text-center'>
                    {weatherDesc}
                </div>
            </div>
        )} 
        />
        <InfoCard 
        title={(
        <div>
            <AirIcon />
            Vind
        </div>
        )}
        content={(
            <div className='flex flex-col items-center'>
                <ArrowRightAltIcon className='mt-2 w-full h-full' style={rot}/>
                <div className='mt-auto mb-2 text-center'>
                    <p>{windAngle ? windAngle : 0} &deg; {windAngle ? getDirection(windAngle) : "N"}</p>
                    <p>{windSpeed ? windSpeed : 0} m/s</p>
                </div>
            </div>
        )} 
        />
        <InfoCard 
        title={(
        <div>
            <DeviceThermostatIcon />
            Temperatur
        </div>
        )}
        content={(
            <div className='grid grid-cols-2 w-full mt-4 px-5 whitespace-nowrap'>
                <p>Känns som:</p>
                <p className='ml-auto'>{feelTemp ? feelTemp : 0} &deg;</p>
                <p>Högsta:</p>
                <p className='ml-auto'> {maxTemp ? maxTemp : 0} &deg;</p>
                <p>Lägsta:</p>
                <p className='ml-auto'> {minTemp ? minTemp : 0} &deg;</p>
            </div>
        )} 
        />
        <InfoCard 
        title={(
            <div>
            <WbSunnyIcon className='mx-1'/>
            Solgång
            </div>
        )}
        content={(
            <div>
                <div className='text-center mb-1'>
                    <h1 className='text-xl'>{timeUntilSunChange}</h1>
                    { isDay ? (
                        <div>
                            tills nedgång
                        </div>
                    ) : (
                        <div>
                            tills uppgång
                        </div>
                    )}
                    </div>
                <div className='grid grid-cols-2 w-full mt-1 px-8 whitespace-nowrap'>   
                    <p>↑</p>
                    <p className='ml-auto'>{formatTime(sunrise)}</p>
                    <p>↓</p>
                    <p className='ml-auto'>{formatTime(sunset)}</p>
                </div>
        </div>
        )}/>
        <InfoCard 
        title={(
            <div>
            <VisibilityIcon className='mx-1'/>
            Sikt
            </div>
        )}
        content={(
            <div className='w-full flex flex-col justify-center items-center'>
                <h1 className='text-2xl mt-4'>{visibility ? Math.round(visibility / 1000) : 0} km</h1>
                <h1 className='text-sm text-slate-400'>({visibility ? visibility : 0} m)</h1>
            </div>
        )}/>
        <InfoCard 
        title={(
            <div>
            <Water className='mx-1'/>
            Luftfuktighet
            </div>
        )}
        content={(
            <div className='w-full flex flex-col justify-center items-center'>
                <h1 className='text-2xl mt-4'>{humidity ? Math.round(humidity) : 0}%</h1>
                <h1 className='text-sm text-slate-400'>Daggpunkt: {dewPoint ? dewPoint : 0} &deg;</h1>
            </div>
        )}/>
      </div>
  )
}

export default InfoTable