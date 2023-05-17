const HIBOU_API_URL = 'https://api.lehibou.com/api/reference';
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

async function postCitySearch(search) {
  const response = await fetch(`${HIBOU_API_URL}/address/city/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ search }),
  });

  return response.json();
}

async function getWeatherForecast(lat, lon) {
  const urlParams = new URLSearchParams({
    lat,
    lon,
    appid: process.env.VUE_APP_OPEN_WEATHER_API_KEY,
  });

  const response = await fetch(`${OPEN_WEATHER_API_URL}/forecast?${urlParams.toString()}`);

  return response.json();
}

const API = {
  postCitySearch,
  getWeatherForecast
};

export default API;
