function currentDate(now) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

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

  let icon = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#weather-emoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let temperature = Math.round(response.data.main.temp);
  let fDegrees = document.querySelector("#fahrenheit");
  fDegrees.innerHTML = temperature;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humPercent = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humPercent;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;

  let tempMin = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#min");
  min.innerHTML = tempMin;

  let tempMax = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#max");
  max.innerHTML = tempMax;

  fahrenheitTemp = response.data.main.temp;
  windy = response.data.wind.speed;
  minTemp = response.data.main.temp_min;
  maxTemp = response.data.main.temp_max;
}

//
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
  flink.classList.remove("active");
  clink.classList.add("active");
  let celsiusTemp = temperatureElement.innerHTML;
  celsiusTemp = Number(celsiusTemp);
  temperatureElement.innerHTML = Math.round(((fahrenheitTemp - 32) * 5) / 9);

  let windElement = document.querySelector("#wind");
  let windSpeed = windElement.innerHTML;
  windSpeed = Number(windSpeed);
  windElement.innerHTML = Math.round(windy * 1.60934);

  let w = document.querySelector("#w");
  w.innerHTML = " km/h";

  let fc = document.querySelector("#f-c");
  fc.innerHTML = "°C";

  let minElement = document.querySelector("#min");
  let min = minElement.innerHTML;
  min = Number(min);
  minElement.innerHTML = Math.round(((minTemp - 32) * 5) / 9);

  let maxElement = document.querySelector("#max");
  let max = maxElement.innerHTML;
  max = Number(max);
  maxElement.innerHTML = Math.round(((maxTemp - 32) * 5) / 9);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  flink.classList.add("active");
  clink.classList.remove("active");

  let temperatureElement = document.querySelector("#fahrenheit");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(windy);

  let w = document.querySelector("#w");
  w.innerHTML = " mph";

  let fc = document.querySelector("#f-c");
  fc.innerHTML = "°F";

  let minElement = document.querySelector("#min");
  minElement.innerHTML = Math.round(minTemp);

  let maxElement = document.querySelector("#max");
  maxElement.innerHTML = Math.round(maxTemp);
}
let fahrenheitTemp = null;
let windy = null;
let minTemp = null;
let maxTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

let clink = document.querySelector("#c-link");
clink.addEventListener("click", convertToCelsius);

let flink = document.querySelector("#f-link");
flink.addEventListener("click", convertToFahrenheit);

searchCity("Los Angeles");
//
