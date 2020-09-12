// Global Variables
var cityNameEl = document.getElementById("city");
var cityName = cityNameEl.value.trim();
var searchBtn = document.getElementById("search-btn");
var apiKey = "abc282c13673b28882968001a1c14445";


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
        // City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed
        var name = $("<h1>").text(weatherResponse.name);
        var temp = $("<p>").text("Temperature: "+ weatherResponse.main.temp + " °F");
        var humidity = $("<p>").text("Humidity: "+ weatherResponse.main.humidity + " %");
        var wind = $("<p>").text("Wind Speed: "+ weatherResponse.wind.speed+ " MPH");

        // Append Card Contents to Card
        currentCard.append(name);
        currentCard.append(temp);
        currentCard.append(humidity);
        currentCard.append(wind);

        // Gather Lat & Lon
        var lat = weatherResponse.coord.lat;
        var lon = weatherResponse.coord.lon;
        
        // Call the other functions
        getUV(lat, lon);
        getForecast(cityName);
        
        // Append Card to Container
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
        // var uviTitle = $("div").text("UV Index: ").addClass("d-inline-flex")
        var uvi = $("<button>").text(uvResponse.value).addClass("btn-sm");
        console.log(uvi);
        if (uvi <= 3) {
            uvi.addClass("btn-success");
        } else if (uvi >= 3 && uvi <= 6) {  
            uvi.addClass("btn-warning");
        } else {
            uvi.addClass("btn-danger");
        }
        $("#today").append(uvi);
        // $("#today").append(uviTitle);
        // $(uviTitle).append(uvi);
    })
}

// Show 5 day forecast
function getForecast(cityName) {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    )
    .then(function(forecastResponse) {
        return forecastResponse.json();
      })
    .then(function(forecastResponse) {
        console.log(forecastResponse);
    // Empty Forecast
    $("#forecast").empty();
    // Create a row for the forecast
    $("#forecast").html("<h4 class='mt-3'>5-Day Forecast:</h4>").append("<div class=\"row\">");
        // Loop through results
        for (i =0; i < forecastResponse.list.length; i++) {
            // Limit the results
            if (forecastResponse.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                // Create the container for each day
                var container = $("<div>").addClass("col-md-2 mt-2");
                var card = $("<div>").addClass("card text-white bg-primary");
                var body = $("<div>").addClass("card-body p-2");
                
                // Forecast Information
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastResponse.list[i].weather.icon + ".png");
                var tempFore = $("<p>").addClass("card-text").text("Temp: " + forecastResponse.list[i].main.temp_max + " °F");
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + forecastResponse.list[i].main.humidity + " %");

                // Append Forecast to Row
                container.append(card.append(body.append(icon, tempFore, humidity)));
                $("#forecast .row").append(container);
            }
        }
    })
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


