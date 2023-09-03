const page = document.getElementById("veiwCont");
const apiKey = "d07e6af81e0b30fa8e2bb3a0fe8ed13d";
const url = "https://api.openweathermap.org/data/2.5/weather?";
const arr = document.cookie.split(";");

// https://api.openweathermap.org/data/2.5/weather?lat=26.8379053&lon=81.0008029&appid=d07e6af81e0b30fa8e2bb3a0fe8ed13d&units=metric

const lati = arr[0].split("=")[1];
const long = arr[1].split("=")[1];

window.addEventListener("load", () => {
    
    async function checkWeather() {
        const responce = await fetch(url + `lat=${lati}&lon=${long}&appid=${apiKey}&units=metric`);
        var data = await responce.json();

        document.querySelector(".location").innerHTML = "Location : "+data.name;
        document.querySelector(".wind").innerHTML = "Wind Speed : "+ data.wind.speed+ "kmph";
        document.querySelector(".humidity").innerHTML ="Humidity : "+data.main.humidity+"%";
        document.querySelector(".pressure").innerHTML ="Pressure : "+Math.round(data.main.pressure * 0.000987 )  +"atm";
        document.querySelector(".temp").innerHTML ="Feels like : "+ Math.round(data.main.temp)+"°c";
    }
    
    const weatherData = checkWeather();
    page.innerHTML = "";
    const div = document.createElement("div");
    div.className = "dataPage";
    div.innerHTML = `
    <div class="col1">
        <h1>Welcome To The Weather App</h1>
        <p>Here is your current location</p>
        <div class="ll">
            <p>${lati}</p>
            <p>${long}</p>
        </div>
    </div>
    <div class="col2" id="veiw">
        <iframe src="https://maps.google.com/maps?q=${lati}, ${long}&output=embed" 
            width="100%"
            height="100%"
        ></iframe>
    </div>
    <div class="col3">
        <h1>Your Weather Data</h1>
        <div class="col3-data">
        <p class="location">Location: New Delhi</p>
        <p class="wind">Wind Speed: 100kmph</p>
        <p class="humidity">Humidity : 10</p>
        <p class="time">Time Zone : GMT +5:30</p>
        <p class="pressure">Pressure: 10atm</p>
        <p class="windDir">Wind Direction : North West</p>
        <p class="UV-idx">UV Index : 500</p>
        <p class="temp">Feels like: 30°</p>
        </div>
    </div>`;
    page.appendChild(div);
});


