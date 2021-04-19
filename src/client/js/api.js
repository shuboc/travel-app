const GEONAMES_API_URL = 'http://api.geonames.org/search'
const GEONAMES_USER_ACCOUNT = 'shubochao'

const WEATHERBIT_API_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const WEATHERBIT_API_KEY = '7326d011a9e44dcd85007538c215a98c'

const fetchLatLng = async (placeName) => {
  const res = await fetch(`${GEONAMES_API_URL}?username=${GEONAMES_USER_ACCOUNT}&q=${placeName}&type=json`)
  const json = await res.json()
  return json.geonames[0];
}

const fetchWeather = async (lat, lon, days) => {
  const res = await fetch(`${WEATHERBIT_API_URL}?key=${WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=${days}`);
  const json = await res.json();
  const data = json.data;
  return data[data.length - 1];
}

export {fetchLatLng, fetchWeather}