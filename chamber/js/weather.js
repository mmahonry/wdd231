// --- Weather Configuration ---
const apiKey = "8a62803f4c40ab6696d7be437651a93c";
const lat = 16.7666;   // Timbuktu latitude
const lon = -3.0026;   // Timbuktu longitude

// DOM Elements
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("weatherDesc");
const iconEl = document.getElementById("weatherIcon");

const highEl = document.getElementById("highTemp");
const lowEl = document.getElementById("lowTemp");
const humidityEl = document.getElementById("humidity");

const forecastContainer = document.getElementById("forecast");

// --- Fetch Weather ---
async function getWeather() {
  try {
    // API URLs
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    // Fetch CURRENT weather
    const currentResponse = await fetch(currentURL);
    if (!currentResponse.ok) throw new Error("Current weather fetch failed");

    const currentData = await currentResponse.json();

    // ➤ Update temperature & conditions
    tempEl.textContent = `${currentData.main.temp.toFixed(1)} °C`;
    descEl.textContent = currentData.weather[0].description;

    // ➤ Update HIGH / LOW / HUMIDITY
    highEl.textContent = `${currentData.main.temp_max.toFixed(1)} °C`;
    lowEl.textContent = `${currentData.main.temp_min.toFixed(1)} °C`;
    humidityEl.textContent = `${currentData.main.humidity}%`;

    // ➤ Update current weather icon
    const iconCode = currentData.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = currentData.weather[0].description;

    // Fetch FORECAST
    const forecastResponse = await fetch(forecastURL);
    if (!forecastResponse.ok) throw new Error("Forecast fetch failed");

    const forecastData = await forecastResponse.json();

    // Filter for 3 days at 12:00 PM
    const daily = forecastData.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    // Clear previous results
    forecastContainer.innerHTML = "";

    // ➤ Insert text-only forecast cards
    daily.forEach(day => {
      const dateLabel = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long"
      });

      const card = document.createElement("div");
      card.classList.add("forecast-card");

      card.innerHTML = `
        <h4>${dateLabel}</h4>
        <p>${day.main.temp.toFixed(1)} °C</p>
        <p>${day.weather[0].description}</p>
      `;

      forecastContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Weather API Error:", err);
    tempEl.textContent = "N/A";
    descEl.textContent = "Unable to load weather";
  }
}

// Initialize
getWeather();
