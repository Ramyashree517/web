const apiKey = "70cd726a1653955315c21868ab632376"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.getElementById("weather-info");
  const city = cityInput.value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please try again.");
    } else {
      updateWeatherUI(data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred. Please try again later.");
  }
}

function updateWeatherUI(data) {
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const weatherIcon = document.getElementById("weather-icon");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");

  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  cityName.textContent = data.name;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;

  weatherInfo.classList.remove("hidden");
}

// Add event listener for pressing Enter key
document
  .getElementById("city-input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });
