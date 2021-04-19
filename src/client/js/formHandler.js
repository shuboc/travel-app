import {fetchLatLng, fetchWeather} from './api';

const formHandler = async (e) => {
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

  const daysFromNow = (date - now) / (24 * 60 * 60 * 1000);
  if (daysFromNow > 16) {
    alert('Can only get the weather within 16 days!');
    return;
  }

  try {
    // Get lat and lng
    const latLng = await fetchLatLng(placeName);

    // fetch weather forecast
    const weatherRes = await fetchWeather(latLng.lat, latLng.lng, daysFromNow);
    console.log(weatherRes);

    // TODO: update UI
  } catch (e) {
    // TODO: show error message on UI
  }
}

export { formHandler }