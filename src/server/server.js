const projectData = [];

const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');
const {fetchLatLng, fetchWeather, fetchImage} = require('./api');
const {getDaysFromNow} = require('./dateUtil');

dotenv.config();

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const server = app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/data', (req, res) => {
    res.send(projectData);
});

app.post('/data', async (req, res) => {
    console.log(req.body);
    const {placeName, timestamp} = req.body;

    // fetch lat/lng
    const latLng = await fetchLatLng(placeName);
    console.log(latLng);

    // fetch weather forecast
    const weatherRes = await fetchWeather(latLng.lat, latLng.lng, new Date(timestamp));
    console.log(weatherRes);

    // fetch place image
    const imageRes = await fetchImage(placeName);
    console.log(imageRes);

    const data = {
        placeName,
        largeImageURL: imageRes.largeImageURL,
        timestamp,
        weather: weatherRes,
        daysFromNow: getDaysFromNow(new Date(timestamp)),
    }

    // push data
    projectData.push(data);

    res.send(data);
});

module.exports = server;