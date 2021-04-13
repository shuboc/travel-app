import {fetchLatLng} from './api';

const formHandler = async (e) => {
  e.preventDefault();

  const placeName = document.getElementById('placename').value;
  if (!placeName || !placeName.trim()) {
    alert('Please enter a place name!');
  }

  const latLng = await fetchLatLng(placeName);

  console.log(latLng);
  // TODO: update UI
}

export { formHandler }