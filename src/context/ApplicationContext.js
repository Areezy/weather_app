import React, { useState } from 'react';

const ApplicationContext = React.createContext({
  menuToggled: false,
  locationToSearch: '',
  changeMenuState: () => {},
  changeLocationToSearch: () => {},
});

export function ApplicationContextProvider(props) {
  const [menuToggled, setMenuToggled] = useState(false);
  const [locationToSearch, setLocationToSearch] = useState('');

  function changeMenuState() {
    setMenuToggled((prevState) => !prevState);
  }

  return (
    <ApplicationContext.Provider
      value={{
        changeMenuState: changeMenuState,
        locationToSearch: locationToSearch,
        menuToggled: menuToggled,
        setLocationToSearch: setLocationToSearch,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContext;
