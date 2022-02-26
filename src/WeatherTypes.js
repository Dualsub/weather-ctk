/*
 * Meta-data för varje vädertyp utifrån: https://openweathermap.org/weather-conditions
 * id-variablen för varje vädertyp är den första siffran i den väderkod som tas emot i API-anropet.
 */
import BoltIcon from '@mui/icons-material/Bolt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export const weatherMeta = {
    1: {
        description: "Oskväder",
        bgColor: "bg-gradient-to-t from-blue-600  via-gray-300 to-gray-200",
        icon: (
            <BoltIcon />
            )
        },
    2: {
        description: "Duggregn",
        bgColor: "bg-gradient-to-t from-blue-300 via-gray-500 via-gray-500 to-gray-600",
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
        bgColor: "bg-gradient-to-t from-blue-400 to-cyan-500",
        icon: (<AcUnitIcon />)
    },
    5: {
        description: "Vet Ej",
        bgColor: "bg-gradient-to-t from-blue-600 via-cyan-600 to-cyan-500",
        icon: (<div className='text-3xl text-white'>☀️</div>) 
        // (
        //     <WbSunnyIcon className='text-yellow-300'/>
        // )
    },
    6: {
        description: "Molnigt",
        bgColor: "bg-gradient-to-t from-gray-500 to-gray-400",
        icon: (<div className='text-3xl'>☁️</div>)

    },
    7: {
        description: "Klart",
        bgColor: "bg-gradient-to-t from-blue-600 via-cyan-600 to-cyan-500",
        icon: (
            <WbSunnyIcon style={{fontSize: "36px" }} className='text-yellow-300'/>
        )
    }
}

export const getWeatherData = (weatherType) => {
    return weatherMeta[weatherType]
}

// Returns id of the weather type extracted from the supplied weather object. 
export const getWeatherType = (inputWeather) => {

    let weather = null 
    // We pick the first weather if we get and array of weathers.
    if(typeof(inputWeather) == Array)
        weather = inputWeather
    else
        weather = inputWeather[0]

    // The first number in the id is the type of weather.
    const firstNum = weather.id.toString().charAt(0)
    const type = parseInt(firstNum)
    
    console.log("weather ", firstNum);

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
    }

    return null;
} 