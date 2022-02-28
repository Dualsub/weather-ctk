/*
 * Component that selects the current city to display.
 */

import { Search } from '@mui/icons-material'
import { Autocomplete } from '@mui/material'
import React from 'react'
import { cities } from '../cities'

const CitySelector = ({ city, setCity }) => {
  
    return (
    <div className='w-full'>
        <Autocomplete
        value={city}
        className='w-full'
        id="city-selector"
        options={cities}
        noOptionsText="Ingen matchande stad."
        getOptionLabel={(option) => `${option.name}, ${option.country}`}
        renderInput={(params) => (
          <div 
          ref={params.InputProps.ref} 
          className="flex bg-white rounded-lg shadow-md flex-row items-center mb-4 mt-8 lg:mt-12"
          >
            <Search className='my-2 mx-4'/>
            <input 
            type="text" {...params.inputProps} 
            className='w-full px-4 py-6 h-8 focus:outline-none bg-transparent'
            />
          </div>
        )}
        onChange={(event, newValue) => {
            console.log(newValue);
            if(newValue)
              setCity(newValue)
        }}
      />
    </div>
  )
}

export default CitySelector