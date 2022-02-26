import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { cities } from '../cities'

const CitySelector = ({ city, setCity }) => {
  
    return (
    <div className='flex bg-white rounded-md flex-col w-full mt-8 mb-4'>
        <Autocomplete
        className='w-full'
        id="city-selector"
        options={cities.map((city) => city.name)}
        renderInput={(params) => <TextField {...params} label="Stad" />}
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