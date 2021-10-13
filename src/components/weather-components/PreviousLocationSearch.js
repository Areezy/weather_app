import styles from './previouslocation.module.css';
import { IoIosArrowForward } from 'react-icons/io';
export default function PreviousLocationSearch({ location, onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p>{location || 'London'}</p>
      <IoIosArrowForward style={{ color: 'white', fontSize: '22px' }} />
    </div>
  );
}
