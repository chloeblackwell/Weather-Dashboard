//for (var i = 0; i < localStorage.length; i++) {


// var cityName = localStorage.getItem(i);
//  var city = $(".list-group").addClass("list-items");
//  city.append("<li>" + cityName + "<li>");

// console.log(cityName);
//}

// Click event for the search button 

$('.searchButton').on('click', function () {

    var userInput = $('.userInput').val();

    var cityName = localStorage.getItem('city');
    console.log(cityName);


    // Variables of the API 

    var currentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=3fdb944f27f631c445b45c39a8acbb8d&units=metric";
    var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=3fdb944f27f631c445b45c39a8acbb8d&units=metric";

    $.ajax({
        url: currentDay,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var city = $(".list-group").addClass("list-items");
        city.append("<li>" + response.name + "<li>");

        localStorage.setItem('city', response.name);

        var currentForecast = $(".currentCard").append("<div>").addClass("forecast");
        var currentCity = currentForecast.append("<p>");
        currentForecast.append(currentCity);
        // Date with the city 
        var date = moment().format('D/M/YYYY');
        currentCity.append("<h3>" + response.name + " " + date + "</h3>");
        //currentCity.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png">`);

        var currentTemp = currentCity.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        currentCity.append(currentTemp);

        currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        // UV Index API 

        var UV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=3fdb944f27f631c445b45c39a8acbb8d";

        // Appends to Current Temp 

        $.ajax({
            url: UV,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var currentUV = $("<p>" + "UV Index: " + response.value + "</p>");
            currentUV.attr('id', 'UV');
            currentTemp.append(currentUV);

            if (response.value > 9) {

                currentUV.addClass('high');
            } else if (response.value > 6) {

                currentUV.addClass('moderate')
            } else {

                currentUV.addClass('low')
            };
        })

    })

    // Call for 5 day forecast 

    $.ajax({
        url: fiveDayForecast,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var day = [0, 8, 16, 24, 32];
        var fiveDayDiv = $(".fiveDay").addClass("five-text");

        day.forEach(function (i) {

            var fiveDate = response.list[i].dt_txt;

            fiveDayDiv.append("<div class=fiveDayColour>" + "<p>" + fiveDate + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

        })

    })

});    
