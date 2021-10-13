const retrieveLocation = () => {
  if (navigator.geolocation) {
    return new Promise(
      (geolocationSuccessFunction, geolocationFailureFunction) => {
        navigator.geolocation.getCurrentPosition(
          geolocationSuccessFunction,
          geolocationFailureFunction
        );
      }
    );
  } else {
    alert(
      'Location services are not available on this browser, please use a browser that supports it'
    );
  }
};

const provideLocation = async () => {
  let location = await retrieveLocation();

  let locationObject = {};

  locationObject = {
    lat: location.coords.latitude,
    lon: location.coords.longitude,
  };

  return locationObject;
};

export const getLocationNameFromCoords = async (latitude, longitude) => {
  try {
    let apiURL = `${process.env.REACT_APP_SERVER}/api/reversegeocode?lat=${latitude}&lon=${longitude}`;

    const response = await fetch(apiURL);

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};

export const getCoordsFromLocationName = async (location) => {
  try {
    let apiURL = `${process.env.REACT_APP_SERVER}/api/geocode?location=${location}`;

    const response = await fetch(apiURL);

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};

export const parseDate = (momentObj) => {
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let day = days[momentObj.isoWeekday() - 1];
  let momentDateFormated = momentObj.format('ll');
  let month = momentDateFormated.slice(0, 3);
  let date = momentDateFormated.slice(4, 6);

  let parsedDate = `${day}, ${date} ${month}`

  return parsedDate;
};

export const convertMetersToMiles = (value) => {
  let miles = value *  0.0006213712;
  let milesToReturn = miles.toFixed(2);
  return milesToReturn;
}

export default provideLocation;
