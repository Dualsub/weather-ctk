import React from 'react'
import InfoCard from './InfoCard'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getWeatherData } from '../WeatherTypes';
import Visibility from '@mui/icons-material/Visibility';

const formatTime = (date) => {
    return `${date.getHours().toString()}:${date.getMinutes() < 10 ? "0"+ date.getMinutes().toString() : date.getMinutes().toString()}`;
}

const InfoTable = ({ windSpeed, windAngle, sunrise, sunset, minTemp, maxTemp, feelTemp, visibility, weatherType}) => {

    const rot = {
        transform: `rotate(${windAngle ? windAngle-90 : -90}deg)`,
        fontSize: "50px"
    };

    const weather = getWeatherData(weatherType)
    const now = new Date()

    // Here we calculate is the sun is up or not, and also the time until it switches.
    const isDay = sunrise < now && sunset > now
    const timeUntilSunChange = formatTime(isDay ? new Date(sunset.getTime() - now.getTime() - 3600000) : new Date(sunrise.getTime() - now.getTime() - 3600000))

    return (
    <div className='grid md:grid-cols-3 grid-cols-2 lg:w-full'>
        <InfoCard 
        title={(
        <div>
            <AirIcon />
            Väder
        </div>
        )}
        content={(
            <div className='flex flex-col items-center h-full p-2'>
                <div className='text-center my-auto'>
                    {weather.icon}
                </div>
                <div className='mt-auto mb-2 text-center'>
                    {weather.description}
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
                    <p>{windSpeed ? windAngle : 0} &deg; N</p>
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
            <div className='w-full flex justify-center items-center'>
                <h1 className='text-2xl mt-6'>{visibility ? visibility : 0} km</h1>
            </div>
        )}/>
      </div>
  )
}

export default InfoTable