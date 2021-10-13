import { useContext, useRef, useState, useEffect } from 'react';
import ApplicationContext from '../../context/ApplicationContext';
import { BiX } from 'react-icons/bi';
import { IoMdSearch } from 'react-icons/io';
import styles from './locationsearch.module.css';
import PreviousLocationSearch from './PreviousLocationSearch';

export default function LocationSearch() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchHistoryRaw, setSearchHistoryRaw] = useState('');
  const [itemInLocalStorage, setItemInLocalStorage] = useState(false);
  const searchRef = useRef(null);
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  const {
    changeMenuState,
    setLocationToSearch,
  } = useContext(ApplicationContext);

  useEffect(() => {
    setSearchHistoryRaw(localStorage.getItem('searchHistory'));
  }, []);

  useEffect(() => {
    if (renderCount.current > 1) {
      if (searchHistoryRaw === null) {
        setItemInLocalStorage(false);
      } else {
        setItemInLocalStorage(true);
        setSearchHistory(JSON.parse(searchHistoryRaw));
      }
    }
  }, [searchHistoryRaw]);

  useEffect(() => {
    if (renderCount.current > 1) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [JSON.stringify(searchHistory)]);

  const addToStorage = (searchItem) => {
    if (!searchHistory.includes(searchItem) && searchHistory.length < 5) {
      setSearchHistory((prevState) => [searchItem, ...prevState]);
    }

    if (searchHistory.length === 5 && !searchHistory.includes(searchItem)) {
      setSearchHistory((prevState) => [searchItem, ...prevState.slice(0, 4)]);
    }
  };

  const onSubmitHandler = () => {
    const searchValue = searchRef.current.value;
    if (!searchValue) return;
    addToStorage(searchValue);
    setLocationToSearch(searchValue);
    delayMenu(); 
    
  };

  const delayMenu = () => {
    setTimeout(() => {
      changeMenuState();
    }, 1);
  }
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <BiX
          style={{ color: 'white', fontSize: '44px', cursor: 'pointer' }}
          onClick={changeMenuState}
        />
      </div>
      <div className={styles.inputSubmitionContainer}>
        <div className={styles.inputSearchContainer}>
          <IoMdSearch style={{ color: 'white', fontSize: '22px' }} />
          <input
            className={styles.locationSearchInput}
            placeholder="search location"
            type="text"
            ref={searchRef}
          />
        </div>
        <button
          type="button"
          className={styles.searchButton}
          onClick={onSubmitHandler}
        >
          Search
        </button>
      </div>
      <div>
        {itemInLocalStorage &&
          searchHistory.map((searchItems) => {
            return (
              <PreviousLocationSearch
                location={searchItems}
                key={searchItems}
                onClick={() => {
                  setLocationToSearch(searchItems);
                  changeMenuState();
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
