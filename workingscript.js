var APIKey = "94d7d6bc2bb36707aa5c0b648193b2ce";
var inputFieldEl = document.querySelector("#input-city");
var searchFormEl = document.querySelector("#city-search");
// var city = inputFieldEl.value.trim();
// var getCity = document.querySelector()
// var city;
// Need to adjust application to accept user input to store in city variable

// Confirm the city name is an actual city name and in the api. If not, diplay modals. 
// var confirmCityName = function (cityInput) {
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// fetch(queryURL).then(function(response) {
//     if (response.ok) {
//         saveCity(cityInput);
//     } else {
//         fetchModalEl.style.display = "flex";
//         window.onclick = function (event) {
//             fetchModalEl.style.display = "none";
//         }
//     }
// })
//     .catch(function (error) {
//         serverModalEl.style.display = "flex";
//         window.onclick = function (event) {
//             serverModalEl.style.display = "none";
//         }
//     })
// }

// form handler
var formSubmitHandler = function (event) {
    event.preventDefault();
    // displayCityInfoEl.innerHTML =""
    var cityInput = inputFieldEl.value.trim();
    console.log(cityInput);
    // confirmCityName(cityInput);

    // if (cityInput) {
    //     inputFieldEl.value = "";
    // } else {
    //     formModalEl.style.display = "flex";
    //     window.onclick = function (event) {
    //         formModalEl.style.display = "none";
    //     }
    // }
};


// test api server fetch
var getCityInfo = function (cityName) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            displayCityInfo(data);
        });
    });
};

// getCityInfo("Denver");




// // test local storage
// var saveCity = function (cityInput) {
//     cityStorage.push(cityInput)
//     localStorage.setItem("cities", JSON.stringify(cityStorage))
//     searchHistory(cityInput);


// }

// // view previously searched countries
// var searchHistory = function (countryInput) {
//     var cityListElement = document.createElement("li")
//     var cityAnchor = document.createElement("a")
//     cityAnchor.className = "has-text-light"
//     cityAnchor.textContent = countryInput;
//     cityListElement.appendChild(cityAnchor);
//     cityList.appendChild(cityListElement);

//     cityAnchor.addEventListener("click", eventHandler);
// }

// var eventHandler = function (event) {
//     getCityInfo(event.target.textContent);
// }





// var getCityInfo = function (cityName) {
//     var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
//     fetch(apiUrl).then(function (response) {
//         response.JSON().then(function (data) {
//             console.log(data);
//             displayCityInfo(data);
//         });
//     });
// };
// //     response.json().then(function(data){
// //     console.log(data);
// //     }
// // )});

// // use repose data that returned by the query in the application

// function buildCard(songData) {
//     var cardDiv = document.createElement('div');
//     cardDiv.setAttribute("class", "card col-lg-4 col-md-6 col-sm-12 text-center");
//     var cardBody = document.createElement('div');
//     cardBody.setAttribute("class", "card-body");
//     var paragraph = document.createElement("p");
//     paragraph.textContent = songData.song;
//     var audio = document.createElement("audio");
//     audio.setAttribute("controls", "");
//     var source = document.createElement("source");
//     source.setAttribute("src", songData.url);
//     source.setAttribute("type", "audio/mpeg");
//     audio.textContent = "Your browser does not support the audio element.";
//     audio.appendChild(source);
//     cardBody.appendChild(audio);
//     cardBody.appendChild(paragraph);
//     cardDiv.appendChild(cardBody);
//     rowDiv.appendCard(cardDiv);
// }

searchFormEl.addEventListener("submit", formSubmitHandler);