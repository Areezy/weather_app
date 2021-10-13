import styles from './weather.module.css';
import { BiCurrentLocation } from 'react-icons/bi';
import WeatherTodayIcon from './WeatherTodayIcon';
import { useState, useEffect, useContext, useRef } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import weatherFetch from '../../helpers/apiHelpers';
import provideLocation from '../../helpers/locationHelpers';
import { getLocationNameFromCoords } from '../../helpers/locationHelpers';
import { getCoordsFromLocationName } from '../../helpers/locationHelpers';
import { parseDate } from '../../helpers/locationHelpers';
import moment from 'moment';
import LocationSearch from './LocationSearch';
import ApplicationContext from '../../context/ApplicationContext';
import ProgressBar from '@badrap/bar-of-progress';

export default function WeatherToday(props) {
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState();
  const [location, setLocation] = useState('Kayseri');
  const parsedDate = parseDate(moment());
  const [weatherDescription, setWeatherDescription] = useState('');
  const progress = new ProgressBar();

  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  const {
    menuToggled,
    changeMenuState,
    locationToSearch,
  } = useContext(ApplicationContext);

  const fetchAndUpdateLocation = async () => {
    progress.start();
    try {
      const { lat, lon } = await provideLocation();
      const { city, country } = await getLocationNameFromCoords(lat, lon);
      const response = await weatherFetch(lat, lon, 'metric');
      props.Data(response);
      city === undefined ? setLocation(country) : setLocation(city);
      setWeather(response.current.weather[0].main);
      setTemperature(Math.round(response.current.temp));
      setWeatherDescription(response.current.weather[0].description);
    } catch (error) {
      console.log(error.message);
      // MODAL HERE
    }
    progress.finish();
  };

  const fetchAndUpdateBySearch = async (location) => {
    progress.start();
    try {
      const { lat, lon } = await getCoordsFromLocationName(location);
      const response = await weatherFetch(lat, lon, 'metric');
      props.Data(response);
      setWeather(response.current.weather[0].main);
      setTemperature(Math.round(response.current.temp));
      setWeatherDescription(response.current.weather[0].description);
      setLocation(location);
    } catch (error) {
      alert(
        'You seem to have entered an invalid location, try searching for another'
      );
      console.log(error.message);
      // MODAL HERE
    }
    progress.finish();
  };

  useEffect(() => {
    if (renderCount.current > 1) {
      fetchAndUpdateBySearch(locationToSearch);
    }
  }, [locationToSearch]);

  useEffect(() => {
    async function defaultFetch() {
      progress.start();
      try {
        const response = await weatherFetch(38.73222, 35.48528, 'metric');
        props.Data(response);
        setWeather(response.current.weather[0].main);
        setTemperature(Math.round(response.current.temp));
        setWeatherDescription(response.current.weather[0].description);
      } catch (error) {
        console.log(error.message);
      }
      progress.finish();
    }

    defaultFetch();
  }, []);

  return (
    <>
      <div className={`${styles.fullscreen} tint`}>
        {menuToggled && <LocationSearch />}
        <div className={styles.buttonHeaderContainer}>
          <button className={styles.searchButton} onClick={changeMenuState}>
            Search for places
          </button>
          <button
            className={styles.locationButton}
            onClick={fetchAndUpdateLocation}
          >
            <BiCurrentLocation style={{ color: 'white', fontSize: '22px' }} />
          </button>
        </div>
        <div className={styles.weatherIconContainer}>
          <WeatherTodayIcon weather={weatherDescription} mini={false} />
        </div>
        <div className={styles.temperatureContainer}>
          <p className={styles.temperature}>
            {temperature}
            <span className={styles.celsius}>°C</span>
          </p>
        </div>
        <div>
          <p className={styles.weatherDescription}>{weather}</p>
        </div>
        <div className={styles.date}>
          <p>Today</p>
          <p>•</p>
          <p>{parsedDate}</p>
        </div>
        <div className={styles.locationContainer}>
          <IoLocationSharp style={{ color: '#88869D', fontSize: '22px' }} />
          <p>{location}</p>
        </div>
      </div>
    </>
  );
}
