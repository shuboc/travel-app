const projectData = [];

const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const FormData = require('form-data');
const {fetchLatLng, fetchWeather, fetchImage} = require('./api');
const {getDaysFromNow} = require('./dateUtil');

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

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

module.exports = app;