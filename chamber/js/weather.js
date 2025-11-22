const apiKey = "8a62803f4c40ab6696d7be437651a93c";
const lat = 16.7666;
const lon = -3.0026;

const currentTemp = document.getElementById("currentTemp");
const weatherDesc = document.getElementById("weatherDesc");
const weatherIcon = document.getElementById("weatherIcon");
const forecastContainer = document.getElementById("forecast");

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // CURRENT WEATHER
    const current = data.list[0];
    currentTemp.textContent = `${current.main.temp.toFixed(1)}°C`;
    weatherDesc.textContent = current.weather[0].description;

    const iconCode = current.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = current.weather[0].description;

    // FORECAST
    forecastContainer.innerHTML = "";
    for (let i = 8; i <= 24; i += 8) {
      const day = data.list[i];

      const card = document.createElement("div");
      card.classList.add("forecast-card");

      const dayName = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long"
      });

      const icon = day.weather[0].icon;

      card.innerHTML = `
        <h4>${dayName}</h4>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${day.weather[0].description}">
        <p>${day.main.temp.toFixed(1)}°C</p>
        <p>${day.weather[0].description}</p>
      `;

      forecastContainer.appendChild(card);
    }

  } catch (err) {
    console.error("Weather load error:", err);
  }
}

getWeather();
