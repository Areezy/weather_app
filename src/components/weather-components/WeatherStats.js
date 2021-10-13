import WeatherDaily from './WeatherDaily';
import styles from './weatherstats.module.css';
import WeatherHighlights from './WeatherHighlights';
import { parseDate, convertMetersToMiles } from '../../helpers/locationHelpers';
import moment from 'moment';

export default function WeatherStats({ Data }) {
  const dailyWeatherData = Data.daily;
  const currentWeatherDate = Data.current;

  return (
    <div className={styles.container}>
      <div className={styles.dailyWeatherContainer}>
        {dailyWeatherData !== undefined &&
          dailyWeatherData.map((days, index) => {
            if (index === 0) {
              return (
                <WeatherDaily
                  key={index}
                  tomorrow={true}
                  weather={days.weather[0].description}
                  maxTemp={Math.round(days.temp.max)}
                  minTemp={Math.round(days.temp.min)}
                />
              );
            } else if (index < 5) {
              let date = parseDate(moment().add(index + 1, 'days'));

              return (
                <WeatherDaily
                  key={index}
                  date={date}
                  weather={days.weather[0].description}
                  maxTemp={Math.round(days.temp.max)}
                  minTemp={Math.round(days.temp.min)}
                />
              );
            }
          })}
      </div>
      <div className={styles.highlightContainer}>
        <h2 className={styles.header}>Today's Highlights</h2>
        <div className={styles.weatherHighlights}>
          <WeatherHighlights
            title={'Wind Speed'}
            value={currentWeatherDate?.wind_speed}
          />
          <WeatherHighlights
            title={'Humidity'}
            value={currentWeatherDate?.humidity}
          />
          <WeatherHighlights
            title={'Visibility'}
            value={convertMetersToMiles(currentWeatherDate?.visibility)}
          />
          <WeatherHighlights
            title={'Air Pressure'}
            value={currentWeatherDate?.pressure}
          />
        </div>
      </div>
      <footer>
        Created with <span className={styles.redHeart}> ❤ </span> by{' '}
        <a href="https://github.com/Areezy" rel="noreferrer" target="_blank">
          Lekan
        </a>
      </footer>
    </div>
  );
}
