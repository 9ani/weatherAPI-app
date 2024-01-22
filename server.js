const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/weather', async (req, res) => {
  try {
    const city = req.body.city;
    const apiKey = '00f1bb8a38011dd438f299b212a62ee9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.post('/news', async (req, res) => {
  try {
    const city = req.body.q;     
    console.log('City:', city);

    const apiKey = '988f29fedc0b4d3e8b801de2705cbd57';
    const apiUrl = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(city)}&apiKey=${apiKey}&pageSize=3`;

    const response = await axios.get(apiUrl);
    const newsData = response.data;

    console.log('News API Response:', newsData); 

    res.json(newsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/photos', async (req, res) => {
  try {
    const city = req.body.city;
    const accessKey = 'tjZa3_FiUlmcGH9Y36YkR1dv6d7jJPdRjy9QwElCWyA'; 
    const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(city)}&client_id=${accessKey}`;

    const response = await axios.get(apiUrl);
    const photoData = response.data;

    res.json(photoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
