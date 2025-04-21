const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      // Update the UI with the fetched data
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      description.textContent = `Condition: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
      alert("City not found");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching weather data");
  }
}
