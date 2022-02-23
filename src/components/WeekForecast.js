import React from 'react'
import ForecastCard from './ForecastCard'

const mockData = [
    {
        temp: 23,
        day: "Söndag",
        date: "2/3"
    },
    {
        temp: 21,
        day: "Måndag",
        date: "3/3"
    },
    {
        temp: 18,
        day: "Tisdag",
        date: "4/3"
    },
    {
        temp: 17,
        day: "Onsdag",
        date: "4/3"
    },
    {
        temp: 20,
        day: "Torsdag",
        date: "4/3"
    }
]

const WeekForecast = () => {
  return (
    <div className='flex flex-col items-center'>
        <h2 className='my-6 text-3xl font-thin'>5-dagars prognos</h2>
        <div className='flex flex-row'>
        {mockData.map((dayData) => (
            <ForecastCard {...dayData} />
        ))}
        </div>
    </div>
  )
}

export default WeekForecast