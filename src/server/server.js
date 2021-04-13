var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');

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
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// app.post('/api', function(req, res) {
//     const { url } = req.body;
//     console.log(req.body);
//     console.log(url);

//     const form = new FormData();
//     form.append('key', process.env.API_KEY);
//     form.append('lang', 'auto');
//     form.append('url', url);

//     const formHeaders = form.getHeaders();

//     axios.post('https://api.meaningcloud.com/sentiment-2.1', form, {
//         headers: {
//             ...formHeaders
//         },
//     })
//     .then(response => {
//         console.log(response.data);
//         res.send(JSON.stringify({ data: response.data }))
//     })
//     .catch(err => {
//         console.error(err.response.data);
//     })
// })