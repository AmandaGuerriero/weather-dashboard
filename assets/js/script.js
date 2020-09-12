// Global Variables
var cityNameEl = document.getElementById("city");
var cityName = cityNameEl.value.trim();
var searchBtn = document.getElementById("search-btn");
var apiKey = "abc282c13673b28882968001a1c14445";

// City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed


 // Display UV Index and color code 
 fetch (
     `https:api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=${apiKey}`
 )
     .then(function(response) {
         response.json();
         console.log(response);
 })


// Future 5-day weather for the city


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
        
        // Empty out data
        $("#today").empty();
        
        // Create Card Container
        var currentCard = $("<div>").addClass("card");
        
        // Create Card Contents
        var name = $("<h1>").text(weatherResponse.name);
        var temp = $("<p>").text("Temperature: "+ weatherResponse.main.temp);
        console.log(weatherResponse.main.temp);

        // Append Card Contents to Card
        // currentCard.append(name, temp, uvi);
        currentCard.append(name);
        currentCard.append(temp);
        
        // Append Card to Container

        // Gather Lat & Lon
        var lat = weatherResponse.coord.lat;
        var lon = weatherResponse.coord.lon;
  
        getUV(lat, lon);
        // currentCard.append(uvi);
        $("#today").append(currentCard);
    })
}

// Return a fetch request to get UV Index with the article title and rating parameters
var getUV = function(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
    .then(function(uvResponse) {
        return uvResponse.json();
    })
    .then(function(uvResponse) {
        console.log(uvResponse);
        var uvi = $("<p>").text(uvResponse.value);
        console.log(uvi);
        $("#today").append(uvi);
    })
    // return uvi;
}

// Submit City
searchBtn.onclick = saveCity;


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

// Show all Cities
function printCitySearches(cityName) {
    // var citySearch = JSON.parse(window.localStorage.getItem("citySave")) || [];
    // var cityName = cityNameEl.value.trim();
    console.log("I'm inside printCitySearch" + cityName);
    // citySearch.forEach(function (citySearch) {
        // Create each list item
        var liTag = document.createElement("li");
        liTag.textContent = cityName;
        // liTag.classList = "list-unstyled";
        // Display on page
        var ulEl = document.querySelector(".city-list");
        ulEl.appendChild(liTag);
    // });
}

// Print Cities
printCitySearches(cityName);