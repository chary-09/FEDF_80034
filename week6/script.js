// Select DOM Elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");
const forecastResult = document.getElementById("forecastResult");

// Fetch Weather Data using Async/Await
async function fetchWeather(city) {
  try {
    if (!city) {
      weatherResult.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
      forecastResult.innerHTML = "";
      return;
    }

    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);

    if (!response.ok) {
      throw new Error("City not found or API error.");
    }

    const data = await response.json();
    displayWeather(city, data);
    displayForecast(data);

    // Save city to localStorage
    localStorage.setItem("lastCity", city);

  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
    forecastResult.innerHTML = "";
  }
}

// Display Current Weather
function displayWeather(city, data) {
  const current = data.current_condition[0];
  weatherResult.innerHTML = `
    <h2>${city}</h2>
    <p><strong>Temperature:</strong> ${current.temp_C} °C</p>
    <p><strong>Condition:</strong> ${current.weatherDesc[0].value}</p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
  `;
}

// Display 3-Day Forecast
function displayForecast(data) {
  const forecastDays = data.weather.slice(0, 3); // first 3 days only
  forecastResult.innerHTML = "";

  forecastDays.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    forecastResult.innerHTML += `
      <div class="forecast-card">
        <h3>${index === 0 ? "Today" : dayName}</h3>
        <p><strong>Avg Temp:</strong> ${day.avgtempC} °C</p>
        <p><strong>Condition:</strong> ${day.hourly[4].weatherDesc[0].value}</p>
        <p><strong>Max:</strong> ${day.maxtempC}°C | <strong>Min:</strong> ${day.mintempC}°C</p>
      </div>
    `;
  });
}

// Button Click Event
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  fetchWeather(city);
});

// Load Last City on Page Reload
window.onload = () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
  }
};
