function currentDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9f08e2dtc6459be5bd4d439a047ao3cb";
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
//
function showTemperature(response) {
  console.log(response.data);
  let cityName = response.data.city;
  let display = document.querySelector("#display");
  display.innerHTML = cityName;

  let icon = response.data.condition.icon;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.icon);

  let temperature = response.data.temperature.current;
  temperature = Math.round(temperature);
  let fDegrees = document.querySelector("#fahrenheit");
  fDegrees.innerHTML = temperature;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humPercent = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humPercent;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;

  fahrenheitTemp = response.data.temperature.current;
  windy = response.data.wind.speed;

  getForecast(response.data.coordinates);
}

//
function searchCity(cityInput) {
  let apiKey = "9f08e2dtc6459be5bd4d439a047ao3cb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
//
function submitButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

//

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9f08e2dtc6459be5bd4d439a047ao3cb";
  let units = "imperial";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${units}`;

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
  fc.innerHTML = " °C";
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
  fc.innerHTML = " °F";
}
//
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="futureForecast">${day}</div>
                    <div class="futureIcon">
                      <img
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png"
                        alt="current weather icon"
                        width="36px"
                      />
                    </div>

                    <div class="futureMinMax">
                      <span class="futureMin">50°</span>

                      <span>/</span>
                      <span class="futureMax">43°</span>
                    </div>
                    </div>
                    </div>
        `;
  });

  forecastElement.innerHTML = forecastHTML;
}
//
let fahrenheitTemp = null;
let windy = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

let clink = document.querySelector("#c-link");
clink.addEventListener("click", convertToCelsius);

let flink = document.querySelector("#f-link");
flink.addEventListener("click", convertToFahrenheit);

searchCity("Los Angeles");
displayForecast();
