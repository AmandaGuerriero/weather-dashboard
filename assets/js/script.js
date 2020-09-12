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
        var currentCard = $("<div>").addClass("card-body-current ml-2");
        
        // Create Card Contents
        // City Name, Date, Icon, Weather Conditions, Temperature, Humidity, Wind Speed
        var name = $("<h1 span>").text(weatherResponse.name).addClass("d-inline-flex");
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + weatherResponse.weather[0].icon + ".png");
        var temp = $("<p>").text("Temperature: "+ weatherResponse.main.temp + " °F");
        var humidity = $("<p>").text("Humidity: "+ weatherResponse.main.humidity + " %");
        var wind = $("<p>").text("Wind Speed: "+ weatherResponse.wind.speed+ " MPH");

        // Append Card Contents to Card
        currentCard.append(name);
        currentCard.append(icon);
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
        var uviTitle = $("<span>").text("UV Index: ").addClass("d-inline-flex")
        var uvi = $("<button>").text(uvResponse.value).addClass("btn-sm ml-1 mb-1");
        var uvIndexValue = uvResponse.value;
        console.log(uvIndexValue);
        if (uvResponse.value <= 3) {
            uvi.addClass("btn-success");
        } else if (uvIndexValue >= 3 && uvIndexValue <= 7) {  
            uvi.addClass("btn-warning");
        } else {
            uvi.addClass("btn-danger");
        }
        // Append UV Index to Current Forecast 
        $(".card-body-current").append(uviTitle);
        $(uviTitle).append(uvi);
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
    $("#forecast").html("<h4 class='mt-3 ml-2'>5-Day Forecast:</h4>").append("<div class=\"row\">");
        // Loop through results
        for (i =0; i < forecastResponse.list.length; i++) {
            // Limit the results
            if (forecastResponse.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                // Create the container for each day
                var container = $("<div>").addClass("col-md-2 mt-2 ml-2 mb-2");
                var card = $("<div>").addClass("card text-white bg-primary");
                var body = $("<div>").addClass("card-body p-2");
                
                // Forecast Information
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastResponse.list[i].weather[0].icon + ".png");
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

function printCitySearches() {
    
    if(localStorage.length === 0) {
        console.log(" there is nothing in there")
    } else {
        var citySearch = JSON.parse(window.localStorage.getItem("citySave")) || [];

        for (var i = 0; i < citySearch.length; i++) {
            var listItem = document.querySelector(".city-list");
            
            // Create each list item
            var storedCity = document.createElement("li");
            storedCity.classList = ("list-unstyled list-group-item list-group-item-action");
            
            // Set city name once seareched
            storedCity.textContent = citySearch[i].name;
            storedCity.addEventListener("click", event);

            // Display on page
            listItem.appendChild(storedCity);
        }
        $(".city-list").on("click", "li", function() {
            getCity($(this).text());
        })
    }
}


// Print Cities
printCitySearches(cityName);


