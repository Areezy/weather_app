const weatherFetch = async (latitude, longitude, unit) => {
  try {
    let apiURL = `${process.env.REACT_APP_SERVER}/api/weather/?lat=${latitude}&lon=${longitude}&unit=${unit}`;

    const response = await fetch(apiURL);

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};


export default weatherFetch;
