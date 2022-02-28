import { Search } from '@mui/icons-material'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { cities } from '../cities'

const CitySelector = ({ city, setCity }) => {
  
    return (
    <div className='w-full'>
        <Autocomplete
        className='w-full'
        id="city-selector"
        options={cities.map((city) => city.name)}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} className="flex bg-white rounded-lg shadow-md flex-row items-center focus:outline-1 mb-4 mt-12">
            <Search className='m-2'/>
            <input type="text" {...params.inputProps} className='w-full px-4 py-6 h-8 focus:outline-none bg-transparent'/>
          </div>
        )}
        onChange={(event, newValue) => {
            const newCity = cities.find((c) => c.name === newValue)
            console.log(newValue);
            setCity(newCity)
        }}
      />
    </div>
  )
}

export default CitySelector