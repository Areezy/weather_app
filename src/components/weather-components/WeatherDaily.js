import styles from './weatherdaily.module.css';
import WeatherTodayIcon from './WeatherTodayIcon';
export default function WeatherDaily(props) {
  return (
    <div className={styles.card}>
      <p className={styles.text}>
        {(props.tomorrow && 'Tomorrow') || props.date || 'Sun, 7, Jun'}
      </p>
      <WeatherTodayIcon weather={props.weather || 'clear sky'} mini={true} />
      <div className={styles.tempContainer}>
        <p className={styles.maxTemp}>{props.maxTemp || 11}°C</p>
        <p className={styles.minTemp}>{props.minTemp || 11}°C</p>
      </div>
    </div>
  );
}
