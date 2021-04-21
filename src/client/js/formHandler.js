import {fetchLatLng, fetchWeather, fetchImage} from './api';
import { getDaysFromNow, padZero } from './dateUtil';

const createTripElement = (largeImageURL, placeName, date, weatherRes) => {
  const tripEl = document.createElement('div');
  tripEl.className = "trip";

  const imgEl = document.createElement('img');
  imgEl.src = largeImageURL;
  imgEl.className = "img";
  tripEl.appendChild(imgEl);

  const tripInfoEl = document.createElement('div');
  tripInfoEl.className = 'trip-info';
  tripEl.appendChild(tripInfoEl);

  const placeEl = document.createElement('h2');
  placeEl.className = 'place'
  placeEl.textContent = `My trip to ${placeName}`;
  tripInfoEl.appendChild(placeEl);

  const dateEl = document.createElement('h3');
  dateEl.className = 'date';
  dateEl.textContent = `Departing: ${date.toLocaleDateString()}`;
  tripInfoEl.appendChild(dateEl);

  const daysFromNowEl = document.createElement('p');
  daysFromNowEl.className = 'days-from-now';
  const daysFromNow = getDaysFromNow(date);
  daysFromNowEl.textContent = `${placeName} is ${daysFromNow} days away`;
  tripInfoEl.appendChild(daysFromNowEl);

  const weatherTitleEl = document.createElement('h3');
  weatherTitleEl.className = 'weather-title';
  tripInfoEl.appendChild(weatherTitleEl);
  const weatherEl = document.createElement('p');
  weatherEl.className = 'weather';
  tripInfoEl.appendChild(weatherEl);
  if (typeof weatherRes.max_temp === 'number' && typeof weatherRes.min_temp === 'number') {
    weatherTitleEl.textContent = 'Typical weather for then is:';
    weatherEl.textContent = `High - ${weatherRes.max_temp}, Low - ${weatherRes.min_temp}`;
  } else {
    console.log(weatherRes);
    weatherTitleEl.textContent = `Current weather:`
    weatherEl.textContent = `${weatherRes.temp}, ${weatherRes.weather.description}`;
    const iconEl = document.createElement('img');
    iconEl.className = 'weather-icon';
    iconEl.src = `https://www.weatherbit.io/static/img/icons/${weatherRes.weather.icon}.png`
    weatherEl.appendChild(iconEl);
  }

  return tripEl;
}

const onSubmit = async (e) => {
  e.preventDefault();

  const placeName = document.getElementById('placename').value;
  if (!placeName || !placeName.trim()) {
    alert('Please enter a place name!');
    return;
  }

  const dateStr = document.getElementById('date').value;
  if (!dateStr) {
    alert('Please enter a date!');
    return;
  }

  const [year, month, day] = dateStr.split('-').map(str => parseInt(str, 10));
  const now = new Date();
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);

  // verify future date
  if (date <= now) {
    alert('Please enter a future date!');
    return;
  }

  try {
    // Get lat and lng
    const latLng = await fetchLatLng(placeName);

    // fetch weather forecast
    const weatherRes = await fetchWeather(latLng.lat, latLng.lng, date);

    // fetch place image
    const imageRes = await fetchImage(placeName);

    // append a trip
    const tripEl = createTripElement(imageRes.largeImageURL, placeName, date, weatherRes);
    const tripsEl = document.getElementById('trips');
    tripsEl.prepend(tripEl);

    // clear form
    onClear();
  } catch (e) {
    // TODO: show error message on UI
    console.log(e);
  }
}

const onClear = e => {
  document.getElementById('placename').value = '';
  document.getElementById('date').value = '';
}

export { onSubmit, onClear }