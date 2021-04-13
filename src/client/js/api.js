const GEONAMES_API_URL = 'http://api.geonames.org/search'
const GEONAMES_USER_ACCOUNT = 'shubochao'

const fetchLatLng = async (placeName) => {
  const res = await fetch(`${GEONAMES_API_URL}?username=${GEONAMES_USER_ACCOUNT}&q=${placeName}&type=json`)
  const json = await res.json()
  return json.geonames[0];
}

export {fetchLatLng}