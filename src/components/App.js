import './App.css';
import WeatherToday from './weather-components/WeatherToday';
import { ApplicationContextProvider } from '../context/ApplicationContext';
import WeatherStats from './weather-components/WeatherStats';
import { useState } from 'react';

export default function App() {
  const [weatherData, setWeatherData] = useState({});

  function printData (data) {
    setWeatherData(data);
  }

  return (
    <>
    <ApplicationContextProvider>
      <WeatherToday Data={printData}/>
      <WeatherStats Data={weatherData}/>
    </ApplicationContextProvider>
    </>
  );
}
