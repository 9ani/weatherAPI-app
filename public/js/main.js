document.getElementById('weatherForm').addEventListener('submit', function (event) {
  event.preventDefault();
  getWeather();
});

async function getWeather() {
  const city = document.getElementsByName('city')[0].value;
  const response = await fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `city=${city}`,
  });
  const weatherData = await response.json();

  document.getElementById('weatherInfo').innerHTML = `
    <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Description: ${weatherData.weather[0].description}</p>
    <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather Icon">
    <p>Coordinates: Lat ${weatherData.coord.lat}, Lon ${weatherData.coord.lon}</p>
    <p>Feels Like: ${weatherData.main.feels_like}°C</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Pressure: ${weatherData.main.pressure} hPa</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    <p>Rain (last 3 hours): ${weatherData.rain ? weatherData.rain['3h'] : 0} mm</p>
  `;

  updateMap(weatherData.coord.lat, weatherData.coord.lon);
  getNews(city);
  getCityPhoto(city);
}

let map; 

function updateMap(lat, lon) {
  if (map) {
    map.setView([lat, lon], 13);
  } else {
    map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Uapov Gani SE-2206'
    }).addTo(map);
  }

  L.marker([lat, lon]).addTo(map)
    .bindPopup(document.getElementsByName('city')[0].value)
    .openPopup();
}



async function getNews(city) {
  const response = await fetch('/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `q=${encodeURIComponent(city)}&language=en&pageSize=3`,
  });

  const newsData = await response.json();

  const newsContainer = document.getElementById('newsInfo');
  newsContainer.innerHTML = '<h2>News Articles</h2>';


  if (newsData.status === 'ok' && newsData.articles && newsData.articles.length > 0) {
    for (const article of newsData.articles) {
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(articleElement);
    }
  } else {
    newsContainer.innerHTML = `<p>No news available for ${city}.</p>`;
  }
}


async function getCityPhoto(city) {
  const response = await fetch('/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `city=${city}`,
  });

  const photoData = await response.json();

  const photoContainer = document.getElementById('photoInfo');
  if (photoData.urls && photoData.urls.regular) {
    photoContainer.innerHTML = `<img src="${photoData.urls.regular}" alt="${city} Photo">`;
  } else {
    photoContainer.innerHTML = '<p>No photo available for this city.</p>';
  }
}
