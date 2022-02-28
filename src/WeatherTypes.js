/*
 * Meta-data för varje vädertyp utifrån: https://openweathermap.org/weather-conditions
 * id-variablen för varje vädertyp är den första siffran i den väderkod som tas emot i API-anropet.
 */
import BoltIcon from '@mui/icons-material/Bolt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterIcon from '@mui/icons-material/Water';

// Meta data for weather types.
const weatherMeta = {
    1: {
        description: "Oskväder",
        bgColor: "bg-gradient-to-t from-blue-500 via-gray-600 via-gray-600 to-gray-700",
        icon: (
            <BoltIcon style={{fontSize: "36px" }} />
            )
        },
    2: {
        description: "Duggregn",
        bgColor: "bg-gradient-to-t from-blue-500 via-gray-500 to-gray-600",
        icon: (
            <CloudIcon className='h-full w-full' />
        )
    },
    3 : {
        description: "Regn",
        bgColor: "bg-gradient-to-t from-blue-400 via-gray-500 via-gray-500 to-gray-600",
        icon: (<div className='text-3xl'>🌧️</div>)
    },
    4: {
        description: "Snö",
        bgColor: "bg-gradient-to-t from-blue-600 to-cyan-600",
        icon: (<AcUnitIcon style={{fontSize: "36px" }}  />)
    },
    5: {
        description: "Oklart",
        bgColor: "bg-gradient-to-t from-gray-500 to-gray-500",
        icon: (<WaterIcon style={{fontSize: "36px" }}  />) 
    },
    6: {
        description: "Molnigt",
        bgColor: "bg-gradient-to-t from-gray-500 to-gray-500",
        icon: (<div className='text-3xl'>☁️</div>)

    },
    7: {
        description: "Klart",
        bgColor: "bg-gradient-to-t from-blue-600 to-cyan-500",
        icon: (
            <WbSunnyIcon style={{fontSize: "36px" }} className='text-yellow-300'/>
        )
    }
}

// Extracts and capitializes the description of the weather.
export const getWeatherDesc = (inputWeather) => {
    const weather = inputWeather[0]
    const desc = weather.description
    return desc.charAt(0).toUpperCase() + desc.slice(1)
}


export const getWeatherData = (weatherType) => {
    return weatherMeta[weatherType]
}

// Returns id of the weather type extracted from the supplied weather object. 
export const getWeatherType = (inputWeather) => {

    let weather = inputWeather[0]

    // The first number in the id is the type of weather.
    const firstNum = weather.id.toString().charAt(0)
    const type = parseInt(firstNum)

    switch (type) {

        case 2:
            return 1;         
        case 3:
            return 2;         
        case 5:
            return 3;
        case 6:
            return 4;
        case 7:
            return 5;
        case 8:
            const lastNum = parseInt(weather.id.toString().slice(-1));
            if(lastNum === 0)
                return 7;
            else
                return 6;
        default:
            return null;
    }
} 