import { addTrip, fetchTrips, removeTrip } from './api';
import { parseDate } from './parseDate';

export const createTripElement = (largeImageURL, placeName, date, weatherRes, daysFromNow) => {
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

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.addEventListener('click', async () => {
    const ans = confirm('Are you sure to remove this trip?')
    if (ans) {
      tripEl.remove();
      const res = await removeTrip(placeName);
      console.log(res);
    }
  })
  removeBtn.textContent = 'Remove Trip';
  tripInfoEl.appendChild(removeBtn);

  const daysFromNowEl = document.createElement('p');
  daysFromNowEl.className = 'days-from-now';
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

  const date = parseDate(dateStr);

  // verify future date
  const now = new Date();
  if (date <= now) {
    alert('Please enter a future date!');
    return;
  }

  try {
    const trip = await addTrip(placeName, dateStr, date);

    // append a trip
    const tripEl = createTripElement(trip.largeImageURL, trip.placeName, new Date(trip.timestamp), trip.weather, trip.daysFromNow);
    const tripsEl = document.getElementById('trips');
    tripsEl.prepend(tripEl);

    // clear form
    onClear();
  } catch (e) {
    console.log(e);
  }
}

const onClear = e => {
  document.getElementById('placename').value = '';
  document.getElementById('date').value = '';
}

export { onSubmit, onClear }