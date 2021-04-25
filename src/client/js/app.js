import { onSubmit, onClear, createTripElement } from './formHandler'
import { fetchTrips } from './api';

const app = async () => {
  document.addEventListener('DOMContentLoaded', async () => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', onSubmit);

    const clearBtn = document.getElementById('reset-btn');
    clearBtn.addEventListener('click', onClear);

    // load existing data from server
    const tripsEl = document.getElementById('trips');
    const trips = await fetchTrips();
    for (const trip of trips) {
      const tripEl = createTripElement(trip.largeImageURL, trip.placeName, new Date(trip.timestamp), trip.weather, trip.daysFromNow);
      tripsEl.prepend(tripEl);
    }
  });
}

export { app };