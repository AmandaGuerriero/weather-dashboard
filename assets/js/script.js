// Global Variables
var cityNameEl = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");
var apiKey = "abc282c13673b28882968001a1c14445"


// Show current weather


// City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed

// Display UV Index and color code 

// Future 5-day weather for the city

// City search is added to history
function saveCity(event) {    
    event.preventDefault();
    var cityName = cityNameEl.value.trim();
    // If city is not empty
    if (city !== "") {
        var citySave =
        JSON.parse(window.localStorage.getItem("citySave")) || [];
        
        var cityInfo = {
            name: cityName
        };

        // Save to Local Storage
        citySave.push(cityInfo);
        window.localStorage.setItem("citySave", JSON.stringify(citySave));
    }
    console.log(cityName)
    getCity(cityName);
}

function getCity(cityName) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    )
    .then(function(response) {
        response.json();
        console.log(response);
    })
    .then(function(data) {
        console.log(data);
        var responseContainerEl = document.querySelector("#response-container");
        var currentWeather = document.createElement("div");
        currentWeather.setAttribute("p", data.main.temp);
        responseContainerEl.appendChild(currentWeather);
        console.log(currentWeather);
        // How to make it show on the page?
        // How to convert the units?
    })
}

// Submit City
searchBtn.onclick = saveCity;



// Show all Cities
function printCitySearches() {
    var citySearch = JSON.parse(window.localStorage.getItem("citySave")) || [];
     
    citySearch.forEach(function (citySearch) {
        // Create each list item
        var liTag = document.createElement("li");
        liTag.textContent = citySearch.cityName;
        // liTag.classList = "list-unstyled";
        // Display on page
        var ulEl = document.getElementById("city-list");
        ulEl.appendChild(liTag);
    });
}

// Print Cities
printCitySearches()