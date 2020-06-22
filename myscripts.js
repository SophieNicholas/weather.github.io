if (location.protocol === 'http:') {
    url = 'http://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f';
} else {
    url = 'https://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f';
}
var searchTerm = "";


APIkey = "189b79b5e67df1fad8b5340a47c537f7";

$("#searchButton").on("click", function () {

    event.preventDefault();
    searchTerm = $("#searchTerm").val();
    console.log(searchTerm);
    searchTerm = $("#searchTerm").val();
  
    var newSearch = $("<dt>");
    newSearch.text(searchTerm);
    newSearch.addClass("box")
    $("#boxx").prepend(newSearch);

    function print_today() {
        var now = new Date();
        var months = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
        var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();

        function fourdigits(number) {
            return (number < 1000) ? number + 1900 : number;
        }
        var today = months[now.getMonth()] + "/" + date + "/" + (fourdigits(now.getYear()));
        return today;
    }

    function convertKelvinToCelsius(kelvin) {
        if (kelvin < (0)) {
            return 'below absolute zero (0 K)';
        } else {
            return (kelvin - 273.15);
        }
    }
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + APIkey;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (result) {

        console.log(result);

        var date = $("#date");
        date.text(print_today);

        var city = $("#city");
        city.text(result.name)

        var humidity = $("#humidity");
        humidity.text(result.main.humidity + " %")
        console.log(humidity);

        var temperature = $("#temperature");
        temperature.text(convertKelvinToCelsius(result.main.temp).toFixed(2) + "°C");
        console.log(temperature);

        var wind = $("#wind");
        wind.text(result.wind.speed + " mph")
        console.log(wind);

        var des = $("#des");
        des.text(result.weather[0].description)
        console.log(des);

        var icon = $("#icon");
        var imgSrc = "http://openweathermap.org/img/wn/"+result.weather[0].icon+"@2x.png"; 
        icon.attr("src", imgSrc );
        console.log(icon);

        var long = result.coord.lat;
        console.log(long)

        var lat = result.coord.lon;
        console.log(lat);

        querytwoURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + long;
        console.log(querytwoURL)
        $.ajax({
            url: querytwoURL,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            var UV = $("#UV");
            UV.text(result.value)
            console.log(UV);

            if (result.value > 3) {
                UV.addClass("danger");
            } else if (result.value === 3) {
                UV.addClass("moderate");
            } else {
                UV.addClass("safe");
            }
        });

        date = 5
        querythreeURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly&appid=" +
            APIkey;
        console.log(querythreeURL);


        $.ajax({
            url: querythreeURL,
            method: "GET"
        }).then(function (result) {
            console.log(result)
            for (var i = 0; i < date; i++) {

                var followingDay = $("<div>");
                followingDay.attr("id", "following-day")
                followingDay.addClass("col-md-2");


                var firstDay = (result.daily[i].dt) * 1000;

                var dateObject = new Date(firstDay);

                var dayy = dateObject.toLocaleString();

                var day = $("<p>");
                day.text(dayy);
                var dateHead = $("<h5>");
                dateHead.text("Date: ");
                $(day).prepend(dateHead);

                var conditions = $("<p>");
                conditions.text(result.daily[i].weather[0].description);
                var conditionsHead = $("<h5>");
                conditionsHead.text("Conditions: ");
                $(conditions).prepend(conditionsHead);

                var humidity = $("<p>");
                humidity.text(result.daily[i].humidity + "%");
                var humidityHead = $("<h5>");
                humidityHead.text("Humidity: ");
                $(humidity).prepend(humidityHead);


                var temperature = $("<p>");
                temperature.text(convertKelvinToCelsius(result.daily[i].temp.day).toFixed(2) + "°C");
                var temperatureHead = $("<h5>");
                temperatureHead.text("Temperature: ");
                $(temperature).prepend(temperatureHead);

                $(followingDay).append(day, conditions, humidity, temperature);
                $("#additions").append(followingDay);

            }
        });

    });
});