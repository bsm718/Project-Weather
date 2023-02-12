function currentDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}
function currentTime(now) {
  let hour = now.getHours() % 12 || 12;
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let ampm = hour >= 12 ? "am" : "pm";

  return `${hour}:${mins}${ampm}`;
}

let now = new Date();
let todayDate = document.querySelector("#current-date");
todayDate.innerHTML = currentDate(now);

let todayTime = document.querySelector("#current-time");
todayTime.innerHTML = currentTime(now);
//

function showTemperature(response) {
  let cityName = response.data.name;
  let display = document.querySelector("#display");
  display.innerHTML = cityName;

  let temperature = Math.round(response.data.main.temp);
  let fDegrees = document.querySelector("#fahrenheit");

  let description = document.querySelector("#description");

  let humPercent = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");

  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let minMax = document.querySelector("#min-max");

  fDegrees.innerHTML = temperature;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${humPercent}%`;
  wind.innerHTML = `Wind: ${windSpeed} mph`;
  minMax.innerHTML = `${tempMin}°/${tempMax}°`;
}
function searchCity(cityInput) {
  let apiKey = "65af86af583e025f3332a52aa4176f36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function submitButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

searchCity("Los Angeles");
//

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "65af86af583e025f3332a52aa4176f36";
  let units = "imperial";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);
//

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#fahrenheit");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#fahrenheit");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let clink = document.querySelector("#c-link");
clink.addEventListener("click", convertToCelsius);

let flink = document.querySelector("#f-link");
flink.addEventListener("click", convertToFahrenheit);
//
