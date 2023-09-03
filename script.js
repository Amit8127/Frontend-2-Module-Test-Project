const page = document.getElementById("veiwCont");
const apiKey = "d07e6af81e0b30fa8e2bb3a0fe8ed13d";
const url = "https://api.openweathermap.org/data/2.5/weather?";


function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Somthing is wrong");
    }
}

function showPosition(position) {

    async function checkWeather() {
        const responce = await fetch(url + `lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`);
        var data = await responce.json();

        document.querySelector(".location").innerHTML = "Location : "+data.name;
        document.querySelector(".wind").innerHTML = "Wind Speed : "+ data.wind.speed+ "kmph";
        document.querySelector(".humidity").innerHTML ="Humidity : "+data.main.humidity+"%";
        document.querySelector(".pressure").innerHTML ="Pressure : "+Math.round(data.main.pressure * 0.000987 )  +"atm";
        document.querySelector(".temp").innerHTML ="Feels like : "+ Math.round(data.main.temp)+"°c";
    }
    
    checkWeather();
    page.innerHTML = "";
    page.className ="";
    const div = document.createElement("div");
    div.className = "dataPage";
    div.innerHTML = `
    <div class="col1">
        <h1>Welcome To The Weather App</h1>
        <p>Here is your current location</p>
        <div class="ll">
            <p>Lat : ${position.coords.latitude}</p>
            <p>Long : ${position.coords.longitude}</p>
        </div>
    </div>
    <div class="col2" id="veiw">
        <iframe src="https://maps.google.com/maps?q=${position.coords.latitude}, ${position.coords.longitude}&output=embed" 
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
}