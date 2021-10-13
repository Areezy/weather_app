import styles from './weatherhighlights.module.css';

export default function WeatherHighlights(props) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>{props.title || 'Wind Status'}</p>
        <p className={styles.value}>
          {props.value || 7}{' '}
          {props.title === 'Wind Speed' && (
            <span className={styles.unit}>mph</span>
          )}
          {props.title === 'Humidity' && <span className={styles.unit}>%</span>}
          {props.title === 'Visibility' && (
            <span className={styles.unit}>miles</span>
          )}
          {props.title === 'Air Pressure' && (
            <span className={styles.unit}>mb</span>
          )}
        </p>
      </div>
    );
}
