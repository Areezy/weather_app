import clearImage from '../../assets/Clear.png';
import heavyCloudImage from '../../assets/HeavyCloud.png';
import heavyRainImage from '../../assets/HeavyRain.png';
import lightCloudImage from '../../assets/LightCloud.png';
import showerImage from '../../assets/Shower.png';
import sleetImage from '../../assets/Sleet.png';
import snowImage from '../../assets/Snow.png';
import thunderstormImage from '../../assets/Thunderstorm.png';
import styles from "./weatherTodayIcon.module.css"

export default function WeatherTodayIcon(props) {

    return (
      <div className={styles.weatherIconContainer}>
        {props.weather === 'clear sky' && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={clearImage}
            alt="clear weather icon"
          />
        )}
        {(props.weather === 'broken clouds' ||
          props.weather === 'overcast clouds' ||
          props.weather === 'haze') && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={heavyCloudImage}
            alt="Heavy cloud weather icon"
          />
        )}
        {props.weather.includes('rain') && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={heavyRainImage}
            alt="Heavy rain weather icon"
          />
        )}
        {props.weather.includes('drizzle') && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={showerImage}
            alt="Shower weather icon"
          />
        )}
        {(props.weather === 'few clouds' ||
          props.weather === 'scattered clouds') && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={lightCloudImage}
            alt="Light Cloud weather icon"
          />
        )}
        {(props.weather === 'Sleet' || props.weather.includes('sleet')) && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={sleetImage}
            alt="Sleet weather icon"
          />
        )}
        {(props.weather === 'Snow' || props.weather.includes('snow')) && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={snowImage}
            alt="Snow weather icon"
          />
        )}
        {props.weather.includes('thunderstorm') && (
          <img
            className={props.mini ? styles.mini : ' '}
            src={thunderstormImage}
            alt="Thunderstorm weather icon"
          />
        )}
      </div>
    );
}
