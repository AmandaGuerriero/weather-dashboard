// Global Variables
var cityNameEl = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");
var apiKey = "abc282c13673b28882968001a1c14445";

// City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed

// Display UV Index and color code 
// fetch (
//     `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=${apiKey}`
// )
//     .then(function(response) {
//         response.json();
//         console.log(response);
// })


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

// Show Current Weather
function getCity(cityName) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    )
    .then(function(weatherResponse) {
        return weatherResponse.json();
      })
    .then(function(weatherResponse) {
        console.log(weatherResponse);

        var temp = $("<p>").text("Temperature: "+ weatherResponse.main.temp);
        console.log(weatherResponse.main.temp);
        $("#today").append(temp);
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