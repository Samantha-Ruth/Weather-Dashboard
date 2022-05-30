// Create element for Form
var inputFormEl = document.querySelector("#city-search");
// Create Element for Items put into Form
var inputFieldEl = document.querySelector("#input-city");
// Locates current area to append children to create list! 
var currentCityEl = document.querySelector("#current-city-list");
var forecastEl = document.querySelector("#weather-card-container")
var cityList = document.querySelector("#previous-searches")

var formModalEl = document.querySelector("#form-modal");
var fetchModalEl = document.querySelector("#form-error-fetch");
var serverModalEl = document.querySelector("#form-error-server");
var cityStorage = [];
var time = (moment().format("M/DD/YYYY"));

// Create Form Handler - what to do when City is entered into Form
var formSubmitHandler = function (event) {
    // prevent page from refreshing when submit is clicked
    event.preventDefault();
    // clear page when event is clicked
    displayCurrentWeather.innerHTML = "";
    // create variable for entered city name and clean up.
    var cityName = inputFieldEl.value.trim();
    console.log(cityName);
    // Call function to confirm city name and use it in API
    confirmCityName(cityName);

    // unsure what this modal does right now... If city input has no value. Otherwise... display window.
    if (cityName) {
        inputFieldEl.value = "";
    } else {
        formModalEl.style.display = "flex";
        window.onclick = function (event) {
            formModalEl.style.display = "none";
        }
    }
};

// Confirm Cituy and Fetch Current Weather
var confirmCityName = function (cityName) {
    var APIKey = "94d7d6bc2bb36707aa5c0b648193b2ce";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    // Get Current Weather from City
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            saveCity(cityName);
        }
        // else {
        //     fetchModalEl.style.display = "flex";
        //     // close window on click
        //     window.onclick = function (event) {
        //         fetchModalEl.style.display = "none";
        //     }
        // }
    })
    // .catch(function (error) {
    //     serverModalEl.style.display = "flex";
    //     // close window on click
    //     window.onclick = function (event) {
    //         serverModalEl.style.display = "none";
    //     }
    // })
}

// set local storage and call three functions:
var saveCity = function (cityName) {
    cityStorage.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cityStorage));

    // Don't know what Search History is.... function I need to create! 
    searchHistory(cityName);
    getCityWeather(cityName);
    getForecastedWeather(cityName);
};

// load past cities from local storage onto page
var loadCities = function () {
    // locate local storage named cities
    var savedCities = localStorage.getItem("cities");
    // if there are no cities, set cities to an empty array and return out of function
    if (!savedCities) {
        return false;
    }
    // parse into an array of objects from stringified item
    cityStorage = JSON.parse(savedCities);

    // not sure I understand this loop. 
    for (var i = 0; i < cityStorage.length; i++) {
        var cityName = cityStorage[i];
        // run search history again? 
        searchHistory(cityName)
    }
}

// view previously searched cities
var searchHistory = function (cityName) {
    var cityListElement = document.createElement("h4");
    cityListElement.className = "bg-secondary p-1 text-center"
    var cityAnchor = document.createElement("a");
    cityAnchor.className = "past-city text-light"
    cityAnchor.textContent = cityName;
    cityListElement.appendChild(cityAnchor);
    cityList.appendChild(cityListElement);

    cityAnchor.addEventListener("click", eventHandler);
}

// Not sure what this does... called in the function above to target the text content of a cer
//tain function.  May have entered the wrong function.  
var eventHandler = function (event) {
    getCityWeather(event.target.textContent);
    getForecastedWeather(event.target.textContent);
    // displayFiveDayForecast(event.target.textContent);
}

var getCityWeather = function (cityName) {
    // run api again (do we need to confirm city?)
    var APIKey = "94d7d6bc2bb36707aa5c0b648193b2ce";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            // Convert to JSON
            response.json()
                .then(function (data) {
                    console.log(data);
                    displayCurrentWeather(data);
                });
        });
};

var displayCurrentWeather = function (data) {
    // set and display current city name and date
    var currentCityName = data.name;
    var currentCity = document.createElement("h1");
    var currentCityAnchor = document.createElement("a");
    // var currentWeatherIcon = data.main
    // var weatherIcon = Object.values(icon);
    currentCityAnchor.textContent = currentCityName + " " + time;
    currentCity.appendChild(currentCityAnchor);
    currentCityEl.appendChild(currentCity);


    // update text content of elements with data
    var temp = data.main
    var tempObject = Object.values(temp);
    var currentTemp = tempObject[0];
    var displayCurrentTemp = document.createElement("li");
    displayCurrentTemp.textContent = "Temperature: " + currentTemp + "°F";
    displayCurrentTemp.className = ("current-temp");
    currentCityEl.appendChild(displayCurrentTemp);

    var currentWind = data.wind;
    var windObject = Object.values(currentWind);
    var currentWind = windObject[0];
    var displayCurrentWind = document.createElement("li");
    displayCurrentWind.textContent = "Wind: " + currentWind + " MPH";
    displayCurrentWind.className = ("current-wind");
    currentCityEl.appendChild(displayCurrentWind);

    var humidity = data.main
    var humidityObject = Object.values(humidity);
    var currentHumidity = humidityObject[5];
    var displayCurrentHumidity = document.createElement("li");
    displayCurrentHumidity.textContent = "Humidity: " + currentHumidity + " %";
    displayCurrentHumidity.className = ("current-humidity");
    currentCityEl.appendChild(displayCurrentHumidity);

    var currentUV = data.main
    var displayCurrentUV = document.createElement("li");
    displayCurrentUV.textContent = "UV Index: " + currentUV;
    displayCurrentUV.className = ("current-UV");
    currentCityEl.appendChild(displayCurrentUV);
};

forecastData = [];

//Fetch forecasted Data
var getForecastedWeather = function (cityName) {
    var forecastAPIKey = "b52c5269f80204bc6e363506e9eb053e";
    // 5 day forecast with data every 3 hours by city name. 
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + forecastAPIKey +"&units=imperial";
    fetch(forecastApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (list) {
                    console.log(list);
                    forecastData.push(list);
                    buildWeatherCards(list);
                })
                    .then(function (data) {
                        for (let i = 0; i < forecastData.length; i++) {
                            // debugger;
                            buildWeatherCards(data[i]);
                        }
                    })
                    // .catch((err) => console.log(err))
            }
        });


    var buildWeatherCards = function (list) {

        var cardDiv = document.createElement("div");
        cardDiv.textContent = "5 Day Forecast:";
        cardDiv.setAttribute("class", "bg-dark text-light card col-4 text center");
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        var paragraph = document.createElement("p");
        var paragraphAnchor = document.createElement("a");
        var paragraphAnchorText = "Date";
        // var paragraphAnchorObject = Object.values(paragraphAnchorText);
        // var paragraphTexting = paragraphAnchorObject[4]
        // var paragraphTextObject = Object.values(paragraphTexting);
        // var paragraphText = paragraphTextObject[0]
        paragraphAnchor.textContent = paragraphAnchorText;
        forecastEl.appendChild(cardDiv);
        cardDiv.appendChild(cardBody);
        cardBody.appendChild(paragraph);
        paragraph.appendChild(paragraphAnchor);

        // date is buried in data.list[0], dt.txt

        // Create Variables and List Items to Display Fetched Data by value
        // var displayFiveDayForecast = function (data) {

            // Icon is buried in: list.1.weather.0.icon
            // var weatherIcon = data.list[0]
            var weatherIcon = "Icon"
            // var weatherIconObject = Object.values(weatherIcon);
            // var weatherIconObjectOne = weatherIconObject[2];
            // var weatherIconObjectTwo = Object.values(weatherIconObjectOne);
            // var icon = weatherIconObjectTwo[3];
            var displayWeatherIcon = document.createElement("p");
            displayWeatherIcon.textContent = weatherIcon;
            // displayWeatherIcon.setAttribute("src", icon);
            paragraphAnchor.appendChild(displayWeatherIcon);

            var forecastedTempSearch = "Temp"
            // var forecastedTempSearch = data.list[0];
            // var forecastedTempObject = Object.values(forecastedTempSearch);
            // var forecastedTempObject2 = forecastedTempObject[1];
            // var forecastedTempTexting = Object.values(forecastedTempObject2);
            // var forecastedTemp = forecastedTempTexting[0];
            var displayForecastedTemp = document.createElement("p");
            displayForecastedTemp.textContent = "Temp: " + forecastedTempSearch + " F";
            paragraphAnchor.appendChild(displayForecastedTemp);

            // var forecastedTempSearch = list.main
            // var forecastedTempObject = Object.values(forecastedTempSearch);
            // var forecastedTempObject2 = forecastedTempObject[1];
            // // var forecastedTempTexting = Object.values(forecastedTempObject2);
            // // var forecastedTemp = forecastedTempTexting[0];
            // var displayForecastedTemp = document.createElement("p");
            // displayForecastedTemp.textContent = "Temp: " + forecastedTempObject2 + " F";
            // paragraphAnchor.appendChild(displayForecastedTemp);

            // var forecastedWindSearch = data.list[0];
            var forecastedWindSearch = "Wind"
            // var forecastedWindObject = Object.values(forecastedWindSearch);
            // var forecastedWindTexting = forecastedWindObject[4];
            // var forecastedWindObject2 = Object.values(forecastedWindTexting);
            // var forecastedWind = forecastedWindObject2[0];
            var displayForecastedWind = document.createElement("p");
            displayForecastedWind.textContent = "Wind: " + forecastedWindSearch + " MPH";
            paragraphAnchor.appendChild(displayForecastedWind);


            // var forecastedHumiditySearch = data.list[0];
            var forecastedHumiditySearch = "Humidity";
            // var forecastedHumidityObject = Object.values(forecastedHumiditySearch);
            // var forecastedHumidityTexting = forecastedHumidityObject[1];
            // var forecastedHumidityObject2 = Object.values(forecastedHumidityTexting);
            // var forecastedHumidity = forecastedHumidityObject2[7];
            var displayForecastedHumidity = document.createElement("p");
            displayForecastedHumidity.textContent = "Humidity: " + forecastedHumiditySearch + "%";
            paragraphAnchor.appendChild(displayForecastedHumidity);
    }
}
    inputFormEl.addEventListener("submit", formSubmitHandler);

    loadCities();

