/*
 * Site footer. 
 */

import GitHubIcon from '@mui/icons-material/GitHub';

import React from 'react'

const Footer = () => {
  return (
    <div className='text-slate-600 font-medium shadow-lg bg-white rounded-lg p-4 my-28 flex flex-row'>
        <p className='mx-3'>Simon Sjöling</p>  |  
        <a href='https://github.com/Dualsub/weather-ctk' className='hover:text-blue-600 mx-3'>
          <GitHubIcon /> Github
        </a>
    </div>
  )
}

export default Footer