/*
 * The main component in the componentn tree. Keeps track of the current city that is begin displayed.
 */

import { useEffect, useState } from "react";
import WeekForecast from "./components/WeekForecast";
import TodayForecast from "./components/TodayForecast";
import CitySelector from "./components/CitySelector";
import { cities } from "./cities";
import Footer from "./components/Footer";

const DEFAULT_BACKGROUND = "bg-blue-600"

function App() {
  
  // The city that the weather is shown for.
  const [city, setCity] = useState(cities[0])
  const [background, setBackground] = useState(DEFAULT_BACKGROUND)
  console.log(background);
  return (
    <div className={background + " min-w-full min-h-screen transition-all duration-150 ease-out"}>
      <div className="flex flex-col items-center h-full w-full max-w-6xl lg:mx-auto px-6">
        <div className="flex flex-col items-center w-full mt-4">
          <CitySelector city={city} setCity={setCity} />
          <TodayForecast city={city} setBackground={setBackground}/>
          <WeekForecast city={city}/>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
