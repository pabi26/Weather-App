const form = document.querySelector("form");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");

const apiKey = "7c70b1c4dd5f032dcc948ec4177c23aa"; // Replace with your own API key from OpenWeatherMap

function getWeather(city) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const weather = JSON.parse(xhr.responseText);
      displayWeather(weather);
    } else {
      console.error("Error fetching weather data");
    }
  };
  xhr.send();
}

function displayWeather(weather) {
  const city = weather.name;
  const country = weather.sys.country;
  const temp = weather.main.temp;
  const description = weather.weather[0].description;

  const weatherHTML = `
    <h2>${city}, ${country}</h2>
    <p>Temperature: ${temp} &#8451;</p>
    <p>Description: ${description}</p>
  `;

  weatherInfo.innerHTML = weatherHTML;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value;
  getWeather(city);
});

