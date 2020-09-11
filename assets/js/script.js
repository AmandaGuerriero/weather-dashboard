// Global Variables
var cityNameEl = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");

// Fetch current weather
fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Lindenhurst&appid=abc282c13673b28882968001a1c14445"
)
.then(function(response) {
    return response.json();
})
.then(function(response) {
    var responseContainerEl = document.querySelector("#response-container");
    var currentWeather = document.createElement("div");
    currentWeather.setAttribute("p", response.main.temp);
    responseContainerEl.appendChild(currentWeather);
    console.log(currentWeather);
    // How to make it show on the page?
    // How to convert the units?
})

// Show current weather


// City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed

// Display UV Index and color code 

// Future 5-day weather for the city

// City search is added to history
function saveCity() {    
    var cityName = cityNameEl.value.trim();
    // If city is not empty
    if (city !== "") {
        var citySave =
        JSON.parse(window.localStorage.getItem("citySave")) || [];
        
        var cityInfo = {
            name: cityName
            // Not sure what to put ^^
        };

        // Save to Local Storage
        citySave.push(cityInfo);
        window.localStorage.setItem("citySave", JSON.stringify(citySave));
    }
}

// Submit City
searchBtn.onclick = saveCity;
