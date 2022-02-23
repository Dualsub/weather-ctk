/*
 * Den huvudsakliga komponenten för appen.
 */

import WeekForecast from "./components/WeekForecast";
import TodayForecast from "./components/TodayForecast";

function App() {
  return (
    <div className="bg-white flex flex-col items-center h-max">
      <h1 className="font-medium tracking-tighter text-5xl my-8 drop-shadowlg">Göteborg, Sverige</h1>
      <div className="flex flex-col items-center">
        <TodayForecast />
        <WeekForecast />
      </div>
    </div>
  );
}

export default App;
