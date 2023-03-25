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

function currentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let ampm = "AM";
  if (hours >= 12) {
    hours = hours - 12;
    ampm = "PM";
  }
  if (hours === 0 || hours === 12) {
    hours = "12";
  }

  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  return `Last Updated: ${hours}:${mins} ${ampm}`;
}

let now = new Date();

let todayTime = document.querySelector("#current-time");
todayTime.innerHTML = currentTime(now);

function getForecast(coordinates) {
  let apiKey = "9f08e2dtc6459be5bd4d439a047ao3cb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityName = response.data.city;
  let display = document.querySelector("#display");
  display.innerHTML = cityName;

  let country = response.data.country;
  let countryDisplay = document.querySelector("#country");
  countryDisplay.innerHTML = country;

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

  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = feelsLikeTemp;

  let todayDate = document.querySelector("#current-date");
  todayDate.innerHTML = currentDate(now);

  let timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = currentTime(response.data.time * 1000);

  getForecast(response.data.coordinates);
}

function searchCity(cityInput) {
  let apiKey = "9f08e2dtc6459be5bd4d439a047ao3cb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function submitButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

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

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = "";
  let forecastElement = document.querySelector("#forecast");

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="futureForecast">${formatDay(forecastDay.time)}</div>
                    <div class="futureIcon">
                      <img
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                          forecastDay.condition.icon
                        }.png"
                        alt="current weather icon"
                        width="36px"
                      />
                    </div>

                    <div class="futureMinMax">
                      <span id="futureMin">${Math.round(
                        forecastDay.temperature.minimum
                      )}°/ </span>
                      <span id="futureMax">${Math.round(
                        forecastDay.temperature.maximum
                      )}°</span>
                    </div>
                    </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

searchCity("Los Angeles");
