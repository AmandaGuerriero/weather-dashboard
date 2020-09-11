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
    currentWeather.setAttribute("p", response.main.temp)
    responseContainerEl.appendChild(currentWeather);
    console.log(currentWeather);
})

// Show current weather


// City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed

// Display UV Index and color code 

// Future 5-day weather for the city

// City search is added to history

