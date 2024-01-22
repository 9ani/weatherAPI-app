# Weather App

## Overview

This Weather App allows users to get real-time weather information, latest news, and images of a city. The application is built using Node.js, Express, and integrates with OpenWeatherMap API, News API, and Unsplash API.

## Features

- Get current weather information for a specific city.
- Display latest news articles related to the city.
- Showcase a picture of the city using Unsplash API.
- Visualize the city on a map.

## Setup

Follow these steps to set up and run the Weather App:

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/9ani/weatherAPI-app.git
Navigate to the project directory:

bash
Copy code
cd weather-app
Install dependencies:

bash
Copy code
npm install
Create API keys:

Obtain an API key from OpenWeatherMap and replace the placeholder in server.js.
Get an API key from News API and replace the placeholder in server.js.
Get an API key from Unsplash API and replace the placeholder in server.js.
Start the server:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000.

Usage
Enter the name of the city in the input field and click "Get Weather."
View the weather information, latest news, a picture of the city, and its location on a map.
API Usage
OpenWeatherMap API: Provides weather information.
News API: Fetches the latest news articles.
Unsplash API: Retrieves high-quality images of the city.
Design Decisions
Separation of Concerns: The work logic is implemented in the core JS file (server.js) to keep the HTML file clean.
Responsive Design: The application is designed to work seamlessly on various screen sizes.
Structured CSS: The CSS is organized into classes to improve maintainability.
Author
Gani UApov
Group: SE-2206
