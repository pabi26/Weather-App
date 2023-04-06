const form = document.querySelector("form");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const weatherDiv = document.getElementById('weather-div')

const apiKey = "7c70b1c4dd5f032dcc948ec4177c23aa"; // Replace with your own API key from OpenWeatherMap

function getWeather(city) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const weather = JSON.parse(xhr.responseText);
      displayWeather(weather);
      console.log(weather)
    } else {
      console.error("Error fetching weather data");
    }
  };
  xhr.send();
}

function displayWeather(weather) {
  const city = weather.name;
  const country = weather.sys.country;
  const temp = weather.main.feels_like;
  const feelsLike = weather.main.temp;
  const dailyMax = weather.main.temp_max;
  const dailyMin = weather.main.temp_min;
  const description = weather.weather[0].description;
  const windSpeed = weather.wind.speed;


  const weatherHTML = `
  
    <h2>${city}, ${country}</h2>
    <p>Temperature: ${temp} &#8451;</p>
    <p>Feels like: ${feelsLike} </p>
    <p>Daily High: ${dailyMax}</p>
    <p>Daily Low: ${dailyMin}</p>
    <p>Description: ${description}</p>
    <p>Wind Speed: ${windSpeed}</p>
  `;

  weatherInfo.innerHTML = weatherHTML;

  weatherDiv.style.display = 'block'
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value;
  getWeather(city);
});


document.getElementById('close-weather-info').addEventListener('click', function() {
    weatherDiv.style.display = 'none'
})
