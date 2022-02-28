import React from 'react'

const InfoCard = ({ title, content }) => {
  return (
    <div className='flex flex-col items-center bg-white text-slate-600 rounded-lg shadow-md m-2 lg:m-4 lg:w-40 lg:h-40 transition-all duration-150 scale-100 lg:hover:scale-105'>
        <h1 className='font-medium my-2'>
            {title ?  title : "Vind"}
        </h1>
        {/* <hr className='border-1 w-5/6 border-slate-300' /> */}
        {/* Needs more styling ^ */}
        <div className='w-full h-full'>
        {content && content}
        </div>
    </div>
  )
}

export default InfoCard