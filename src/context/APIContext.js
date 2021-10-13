import React, { useState } from 'react';



const APIContext = React.createContext({
  weatherData: {}
});

export function APIContextProvider(props){
    const [weatherData, setweatherData] = useState({});

    return (
        <APIContext.Provider value={{weatherData: weatherData}}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIContext;