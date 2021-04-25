const fetch = require('node-fetch');
const {getDaysFromNow, padZero} = require('./dateUtil');

const GEONAMES_API_URL = 'http://api.geonames.org/search'
const GEONAMES_USER_ACCOUNT = 'shubochao'

const WEATHERBIT_CURRENT_WEATHER_API_URL = 'https://api.weatherbit.io/v2.0/current';
const WEATHERBIT_CLIMATE_NORMALS_API_URL = 'https://api.weatherbit.io/v2.0/normals';
const WEATHERBIT_API_KEY = '7326d011a9e44dcd85007538c215a98c'

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '21227641-0c8ea71b028b2b238a64b623a';

const fetchLatLng = async (placeName) => {
  const res = await fetch(`${GEONAMES_API_URL}?username=${GEONAMES_USER_ACCOUNT}&q=${placeName}&type=json`)
  const json = await res.json()
  return json.geonames[0];
}

const fetchClimateNormals = async (lat, lon, date) => {
  const dateStr = `${padZero(date.getMonth()+1)}-${padZero(date.getDate())}`;
  const res = await fetch(`${WEATHERBIT_CLIMATE_NORMALS_API_URL}?key=${WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&start_day=${dateStr}&end_day=${dateStr}`);
  const json = await res.json();
  const data = json.data;
  return data[data.length - 1];
}

const fetchCurrentWeather = async (lat, lon) => {
  const res = await fetch(`${WEATHERBIT_CURRENT_WEATHER_API_URL}?key=${WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`);
  const json = await res.json();
  const data = json.data;
  return data[data.length - 1];
}

const fetchWeather = async (lat, lon, date) => {
  const daysFromNow = getDaysFromNow(date);
  if (daysFromNow > 7) {
    return await fetchClimateNormals(lat, lon, date);
  } else {
    return await fetchCurrentWeather(lat, lon);
  }
}

const fetchImage = async (query) => {
  const q = query.split(' ').join('+');
  const res = await fetch(`${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${q}`);
  const json = await res.json();
  return json.hits.length > 0 ? json.hits[0] : undefined;
}

module.exports = {fetchLatLng, fetchWeather, fetchImage}