document.addEventListener("DOMContentLoaded", () => {
  const fetchDataButton = document.getElementById("fetchDataButton");
  const homePage = document.getElementById("home");

  function getWindDirection(degrees) {
    // Define an array of direction names
    const directions = [
      "North",
      "North-Northeast",
      "Northeast",
      "East-Northeast",
      "East",
      "East-Southeast",
      "Southeast",
      "South-Southeast",
      "South",
      "South-Southwest",
      "Southwest",
      "West-Southwest",
      "West",
      "West-Northwest",
      "Northwest",
      "North-Northwest",
    ];

    // Calculate the index in the array based on degrees
    const index = Math.round(degrees / 22.5);

    // Ensure the index is within valid bounds (0-15)
    const normalizedIndex = (index + 16) % 16;

    // Return the corresponding wind direction
    return directions[normalizedIndex];
  }

  function handleGeolocationError(error) {
    // Display an error message to the user
    homePage.innerHTML = `<h2>Error: ${error.message}</h2>`;
    homePage.style.backgroundColor = "white";
  }

  fetchDataButton.addEventListener("click", () => {
    // Get user's geolocation
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display the user's location on Google Maps
            displayMap(latitude, longitude);

            // Fetch weather data using OpenWeatherMap API
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            handleGeolocationError(error);
          }
        );
      } else {
        alert("Geolocation is not available in this browser.");
      }
    } catch (error) {
      handleGeolocationError(error);
    }
  });

  function displayMap(latitude, longitude) {
    homePage.innerHTML = "";
    homePage.id = "";
    homePage.innerHTML = `<div class="col1">
        <h1>Welcome To The Weather App</h1>
        <p>Here is your current location</p>
        <div class="ll">
            <p>Lat : ${latitude}</p>
            <p>Long : ${longitude}</p>
        </div>
    </div>
    <div class="col2" id="veiw">
        <iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" 
            width="100%"
            height="100%"
        ></iframe>
    </div>`;
  }

  function fetchWeatherData(latitude, longitude) {
    // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
    const apiKey = "d07e6af81e0b30fa8e2bb3a0fe8ed13d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle and display weather data
        displayWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  function displayWeatherData(data) {
    // Extract and display relevant weather information
    const weatherHTML = document.createElement("div");
    weatherHTML.className = "col3";
    weatherHTML.innerHTML = `
        <h1>Your Weather Data</h1>
        <div class="col3-data">
        <p class="location">Location : ${data.name}</p>
        <p class="wind">Wind Speed : ${Math.round(
          data.wind.speed * 3.6
        )}kmph</p>
        <p class="humidity">Humidity : ${data.main.humidity}%</p>
        <p class="time">Time Zone : GMT +5:30</p>
        <p class="pressure">Pressure: ${Math.round(
          data.main.pressure * 0.000987
        )}atm</p>
        <p class="windDir">Wind Direction : ${getWindDirection(
          data.wind.deg
        )}</p>
        <p class="UV-idx">UV Index : 500</p>
        <p class="temp">Feels like : ${Math.round(data.main.feels_like)}°c</p>
        `;

    homePage.appendChild(weatherHTML);
  }
});
