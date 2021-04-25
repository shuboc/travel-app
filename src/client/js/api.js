const API_URL = 'http://localhost:8081/data';

const addTrip = async (placeName, dateStr, date) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      placeName,
      timestamp: date.getTime(),
    })
  });
  const json = await res.json();
  return json;
}

const fetchTrips = async () => {
  const res = await fetch(API_URL);
  const json = await res.json();
  return json;
};

export {addTrip, fetchTrips}