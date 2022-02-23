import React from 'react'

const TodayForecast = ({city, day, temp, wind }) => {
  
  return (
    <div className=' text-white w-full flex flex-row justify-between h-96 p-12 my-16'>
      <div className='flex flex-col h-full justify-between'>
      <h1 className='text-6xl font-medium m-2'>
        {city ? city.name : "Ingen stad"}
      </h1>
      <div className='m-2'>
        <div>
        <p>
          Högsta temperatur: 4&deg;
        </p>
        <p>
          Lägsta temperatur: 1&deg;
        </p>
        </div>
      </div>
      </div>
      <div className='flex flex-col h-full justify-between'>
      <h1 className='text-6xl font-normal m-2'>
        {temp ? temp : 0}&deg;
      </h1>
      </div>
    </div>
  )
}

export default TodayForecast