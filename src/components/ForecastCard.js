/*
 * Kort där det står väderprognos för en spcifierad dag.
 */

import React from 'react'

const ForecastCard = ({ day, date, temp }) => {
  return (
    <div className='flex flex-col rounded-lg shadow-lg w-48 h-48 p-3 m-2 bg-blue-300 text-white'>
        <h2 className='text-4xl ml-2'>{temp}&deg;</h2>
        <div className='mt-auto mb-2'>
            <p className='text-xl ml-2'>{day}</p>
            <p className='text-xl ml-2'>{date}</p>
        </div>
    </div>
  )
}

export default ForecastCard