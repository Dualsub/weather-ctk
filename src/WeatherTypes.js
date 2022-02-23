/*
 * Meta-data för varje vädertyp utifrån: https://openweathermap.org/weather-conditions
 * id-variablen för varje vädertyp är den första siffran i den väderkod som tas emot i API-anropet.
 */

import BoltIcon from '@mui/icons-material/Bolt';


export const weatherMeta = {
    1: {
        description: "Oskväder",
        primaryColor: "green-400",
        secondaryColor: "grey-800",
        icon: (
            <BoltIcon />
            )
        },
    2: {
        description: "Duggregn",
        bgColor: "",
        icon: (
            <BoltIcon />
        )
    },
    3 : {
        description: "Regn",
        bgColor: "",
        icon: (
            <BoltIcon />
        )
    },
    4: {
        description: "Snö",
        bgColor: "",
        icon: (
            <BoltIcon />
        )
    },
    5: {
        description: "Molningt",
        bgColor: "",
        icon: (
            <BoltIcon />
        )
    },
    6: {
        description: "Molningt",
        bgColor: "",
        icon: (
            <BoltIcon />
        )
    },
    7: {
        description: "Klart",
        bgColor: "",
        icon: (
            <BoltIcon />
        )
    }
}

// Returns id of the weather type extracted from the supplied weather object. 
export const getWeatherType = (weather) => {

    // The first number in the id is the type of weather.
    const firstNum = toString(weather.id).slice(0);
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
            const lastNum = toString(weather.id).slice(-1);
            if(lastNum == 0)
                return 7;
            else
                return 6;
    }

    return null;
} 